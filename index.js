const fs = require('fs');
const express = require('express');

const app = express();

app.get('/contact-me.html', (req, res) => {
    readAndWriteHTMLToRes('contact-me.html', res);
});

app.get('/about.html', (req, res) => {
    readAndWriteHTMLToRes('about.html', res);
});

app.get('/index.html', (req, res) => {
    readAndWriteHTMLToRes('index.html', res);
});

app.get('/', (req, res) => {
    readAndWriteHTMLToRes('index.html', res);
});

app.use((req, res, next) => {
    readAndWriteHTMLToRes('404.html', res);
});


function readAndWriteHTMLToRes(filename, res)
{
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
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Basic Informational Site - listening on port ${PORT}!`));