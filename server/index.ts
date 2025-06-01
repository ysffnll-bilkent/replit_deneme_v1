import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve the ThreeDModelViewer application at /crystal
app.use("/crystal", express.static(path.join(process.cwd(), "public/crystal")));

// REMOVED: This route was incorrectly intercepting all /crystal/* requests and serving index.html
// app.get("/crystal/*", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "public/crystal/index.html"));
// });

app.get("/crystal/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/crystal/index.html"));
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use process.env.PORT with a fallback, ensuring the port is a number.
  // Listen on 0.0.0.0 for compatibility with platforms like Replit.
  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen(port, () => {
    console.log(`☁️  Sunucu http://localhost:${port} adresinde çalışıyor`);
  });
})();
