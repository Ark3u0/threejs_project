
import http from 'http';

http.createServer((request, response) => {
    response.writeHeader(200);
    response.write("Dog is running.");
    setTimeout(() => {
        response.write("Dog is done.");
        response.end();
    }, 5000);
}).listen(8080);