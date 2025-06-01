import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODELS_DIR = path.join(__dirname, "public", "models");
const OUT_FILE = path.join(MODELS_DIR, "models.json");

const modelFiles = fs.readdirSync(MODELS_DIR)
    .filter(file => file.endsWith(".glb"));

const models = modelFiles.map(file => ({
    name: path.parse(file).name,
    url: "/models/" + file
}));

fs.writeFileSync(OUT_FILE, JSON.stringify(models, null, 2), "utf8");

console.log(`✅ ${models.length} model bulundu. models.json oluşturuldu!`);
