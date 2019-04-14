var http = require('http'),
    express = require('express'),
    util = require('util'),
    path = require('path');

var bodyParser = require('body-parser'),
    static = require('serve-static');

var app = express(); //익스프레스 객체 생성

app.set('port', process.env.PORT || 3000);

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); //body-parser를 사용해 application/json 파싱
app.use('/public', static(path.join(__dirname, 'public'))); //퍼블릭 폴더에 있는 모든 파일을 웹 서버의 루트 패스로 접근할 수 있도록 만들겠다!!

//미들웨어에서 파라미터 확인
app.use(function (req, res, next) {
    util.log('첫 번째 미들웨어에서 요청을 처리함');

    var paramID = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : ' + paramID + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.end();
});

http.createServer(app).listen(app.get('port'), function () {
    util.log("익스프레스 서버를 시작했습니다.");
});