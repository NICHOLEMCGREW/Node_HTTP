const { stat } = require("fs/promises");
const http = require("http");
const port = 3000;

const myServer = http.createServer(requestHandler)

myServer.listen(port, () => console.log(`Server listening on port ${port}`))

function requestHandler(req, res) {
    const { url, method } = req;
    const bufferChunks = [];

    req.on("data", (chunk) => bufferChunks.push(chunk))

    req.on("end", () => {
        let statusCode = 200;
        let contentType = "text/html"
        let resBody = "<h1>404 Not Found</h1><a href='/>Try Here</a>";

     try {
        switch(method + url) {
            // "/GET"
            // "/aboutGET"
            case "GET/":
                resBody = "<h1>Home</h1><a href='/about'>About</a>";
                break;
            case "/GET/about":
                contentType = "application/json";
                resBody = JSON.stringify({ name: "Nichole", city: "Yukon" });
                break;
            case "POST/echo":
                contentType ="application/json";
                let parsedRequestBody = JSON.parse(
                    Buffer.concat(bufferChunks).toString()
                );
                parsedRequestBody.reachedServer = true
                parsedRequestBody.reachedServerAt = new Date().toString();
                resBody = JSON.stringify(parsedRequestBody);
                break;
            default:
                statusCode = 404;
        }

        res.writeHead(statusCode, { "content-Type": contentType})
        res.write(resBody);
        res.end();
     } catch (error) {
         res.writeHead(500, { "Content-Type": "test/html" });
         res.write("<h1>Server Error. Try Again later.</h1>");
         res.end();
     }
    });
}