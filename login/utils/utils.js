import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // //:username/path/to/dirname

export function getViewsPath() {
  return path.join(__dirname, "../views");
}
