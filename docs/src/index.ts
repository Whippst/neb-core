import fs from "fs-extra";
import { markdown } from "./utils/markdown.js";

(async function () {
  console.log("Converting Markdown to HTML...");

  // markdown source
  const content = await fs.readFile("./nebula_core.md", "utf8");

  // converted to HTML
  const rendered = await markdown.render(content);

  const htmlFile = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <title>Convert Markdown to HTML with Node.js</title>
  <link rel="stylesheet" href="./default.css">
  </head>
  <body>
  ${rendered}
  </body>
  </html>`;

  await fs.mkdirs("./public");

  await fs.writeFile("./public/index.html", htmlFile, "utf8");

  await fs.copy(
    "./node_modules/highlight.js/styles/default.css",
    "./public/default.css",
    { overwrite: true }
  );

  console.log("HTML generated.");

})();