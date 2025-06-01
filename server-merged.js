import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1) Ana site statik dosyalarını sun
app.use(express.static(path.join(__dirname, "public")));

// 2) /crystal rotası altına customize-app build çıktılarını sun
app.use("/crystal", express.static(path.join(__dirname, "public/crystal")));

// 3) Diğer tüm istekleri ana site index.html'e yönlendir (SPA fallback)
app.get("*", (req, res) => {
  if (!req.path.startsWith("/crystal")) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});