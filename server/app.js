const http = require('http');
const fs = require('fs');
const url = require('url');
const { parse } = require('querystring');

http.createServer((request, response) => {
    const html = fs.readFileSync('index.html', 'utf8');
    console.log('server work');
    if (request.method == 'GET') {
        console.log(request.method);
        let urlRequest = url.parse(request.url, true);
        //console.log(urlRequest);
        console.log(urlRequest.query.test);
        response.end(html);
    } else {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            console.log(body);
            let params = parse(body);
            console.log(params);
            console.log(params.fname);
            response.end(html);
        });
    }
}).listen(3000);