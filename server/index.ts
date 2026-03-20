import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// fallback SPA somente para rotas sem extensão
app.get("*", (req, res, next) => {
  if (req.path.includes(".")) {
    return next();
  }

  res.sendFile(path.join(publicPath, "index.html"));
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
