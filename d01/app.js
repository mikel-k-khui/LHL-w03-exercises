const http = require("http");
const PORT = 8080;

// a function which handles requests and sends response
const requestHandler = function(request, response) {
  console.log('In requestHandler'); // NEW LINE
  // response.end(`Requested Path: ${request.url}\nRequest Method: ${request.method}`);

  switch (request.url) {
    case '/': response.end("Welcome!"); break;
    case '/url': response.end('<a href="http://www.google.ca"> Google </a><br><a href="http://www.example.com">Example.com</a>'); break;
    default: response.statusCode = 404;
    response.end("404 Page Not Found");
  };
};

const server = http.createServer(requestHandler);
console.log('Server created'); // NEW LINE

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

console.log('Last line (after .listen call)'); // NEW LINE