var express = require('express'),
    http = require('http'),
    static = require('serve-static'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

router.route('/process/product').get(function (req, res) {
    console.log('/process/product 라우팅 함수 호출됨 ');

    if (req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
});

router.route('/process/login').post(function (req, res) {
    console.log('/precess/login 라우팅 함수 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log("요청 파라이터 : " + paramId + ', ' + paramPassword);

    if (req.session.user) {
        console.log("이미 로그인 되어있습니다.");
        res.redirect('/public/product.html');
    } else {
        req.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        };

        res.writeHead(200, {
            "Content-Type": "text/html;charset=utf8"
        });
        res.write("<h1>로그인 성공</h1>");
        res.write("<p>ID : " + paramId + "</p>");
        res.write('<br><br><a href="/process/product.html">상품페이지로 이동하기</a>');
        res.end();
    }
});

router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout 라우팅 함수 호출됨');

    if (req.session.user) {
        console.log('로그아웃 합니다.');
        req.session.destroy(function (err) {
            if (err) {
                console.log('세션 삭제시 에러 발생');
                return;
            }
            console.log('세션삭제 성공!');
            res.redirect('/public/login2.html');
        });
    } else {
        console.log('로그인 되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});

router.route('/process/setUserCookie').get(function (req, res) {
    console.log('/process/setUserCookie 라우팅 함수 호출됨.');

    res.cookie('user', {
        id: 'mike',
        name: '소녀시대',
        authorized: true
    });
    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function (req, res) {
    console.log('/process/showCookie라우팅 함수 호출됨.');

    res.send(req.cookies);
});

app.use('/', router);

app.all('*', function (req, res) {
    res.status(404), send('<h1>Error - 페이지를 찾을 수 없습니다</h1>');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});