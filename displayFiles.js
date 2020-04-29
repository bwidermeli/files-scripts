const http = require("http");
const fs = require("fs");
const results = require("./results.json");

let htmlFile = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>
        Files list
      </title>
      <link rel="stylesheet" href="display/styles.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1>
          Files List
        </h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">File name</th>
              <th scope="col">Download link</th>
            </tr>
          </thead>
          <tbody>
            [[LIST]]
          </tbody>
        </table>
      </div>
      <script type="text/javascript" src="display/scripts.js"></script>
    </body>
  </html>
`;

http
  .createServer(function (request, response) {
    if (request.url === "/") {
      let htmlData = "";
      results.files.map((file, i) => {
        htmlData += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td class="filename">${file.fileName}</td>
          <td><a href="${file.downloadLink}">${file.downloadLink}</a></td>
        </tr>
      `;
      });

      htmlFile = htmlFile.replace("[[LIST]]", htmlData);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(htmlFile);
      response.end();
    } else if (/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())) {
      sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    } else if (/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
      sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else {
      console.log("Requested URL is: " + request.url);
      response.end();
    }
  })
  .listen(3000);

function sendFileContent(response, fileName, contentType) {
  fs.readFile(fileName, function (err, data) {
    if (err) {
      response.writeHead(404);
      response.write("Not Found!");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.write(data);
    }
    response.end();
  });
}
