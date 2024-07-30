const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    console.log(q.pathname);
    let filename = q.pathname === '/' ? './index.html' : `.${q.pathname}`;

    if (filename !== './about.html' &&
        filename !== './contact-me.html' &&
        filename !== './index.html'
    )
    {
        filename = './404.html';
    }

    fs.readFile(filename, (err, data) => {
        if (err)
        {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("Something evil has occurred");
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);