var http = require('http'),
    express = require('express'),
    util = require('util');

var app = express();

app.use(function (req, res, next) {
    util.log('첫번째 미들웨어에서 요청 처리');

    res.send({
        name: '소녀시대',
        age: 20
    });

});


http.createServer(app).listen(3000, function () {
    util.log("익스프레스 서버를 시작했습니다.");
});