var express = require('express'),
    http = require('http'),
    static = require('serve-static'),
    path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser());

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
    console.log('/process/showCookie 라우팅 함수 호출됨.');

    res.send(req.cookies);
});

app.use('/', router);

app.all('*', function (req, res) {
    res.status(404), send('<h1>ERROR - 페이지를 찾을 수 없습니다</h1>');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});