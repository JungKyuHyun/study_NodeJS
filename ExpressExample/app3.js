var http = require('http'),
    express = require('express');

var app = express();

app.use(function (req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    req.user = 'mike';
    next();
});

app.use(function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');
});

app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express 서버가 3000번에서 실행됨.');
});