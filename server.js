
const http = require("http");
const port = 5000;

http
.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    request.on("data", (chunk) => bufferChunks.push(chunk));
    request.on("end", () => {
        if (request.url == "/echo") {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write("Echo");
        } else if (request.url == "/home") {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(
                JSON.stringify({ value: true })
                )
        } else if (request.url == "/about" && request.method == "POST") {
            let body = JSON.parse(Buffer.concat(bufferChunks).toString());
            body.confirmation = true;
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(body));
        } else {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write("<h1>404 Not Found</h1><a href='/home'>Try here</a>");
        }
            response.end();
        })
})

 .listen(5000, () => console.log("Server listening to port: " + 5000));
