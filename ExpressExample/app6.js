var http = require('http'),
    express = require('express'),
    util = require('util');

var app = express();

app.use(function (req, res, next) {
    util.log('첫번째 미들웨어에서 요청 처리');

    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;
    var lag = req.header('Accept-Language');

    res.writeHead('200', {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write("<br>" + lag);
    res.end();
});


http.createServer(app).listen(3000, function () {
    util.log("익스프레스 서버를 시작했습니다.");
});