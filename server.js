var http = require('http'),
    ejs = require('ejs'),
    fs = require('fs'),
    express = require('express'),
    app = express();


app.use("/_css", express.static('app/_css'));
app.use("/_data", express.static('app/_data'));
app.use("/_libs", express.static('app/_libs'));
app.use("/_scripts", express.static('app/_scripts'));

app.get('/', function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('app/index.ejs', 'utf-8', function (err, content) {
        if (err) {
            throw err;
        }
        var renderedHtml = ejs.render(content);
        res.end(renderedHtml);
    });
});

http.createServer(app).listen(3000);

console.log("App running on 3000");