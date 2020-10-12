var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    app = express();


app.use("/css", express.static('css'));
app.use("/img", express.static('img'));
app.use("/oob", express.static('img'));
app.use("/games", express.static('games'));
app.use("/scripts", express.static('scripts'));

app.get('/demo', (req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('games/demo.html', 'utf-8', (err, content) => {
        if (err) {
            throw err;
        }
        res.end(content);
    });
});

const DEMO_PORT = 44153;
http.createServer(app).listen(DEMO_PORT);

console.log(`App running on ${DEMO_PORT}`);
