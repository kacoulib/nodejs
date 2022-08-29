import { BASE_URL } from "../config/index.js";

export const getHtml = (name, content) =>
  `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="${BASE_URL}/css/styles.css" />
      <title>${name}</title>
    </head>
    <body>
      <nav>
        <ul>
          <li>
            <h1>Kittens</h1>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <div class="container">
        ${content}
      </div>
    </body>
  </html>
`;
