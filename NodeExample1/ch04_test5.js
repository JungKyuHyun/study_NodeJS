var fs = require("fs");

//파일을 동기식 IO로 읽어 들입니다.
var data = fs.readFileSync("../package.json", "utf-8");
console.log(data);
console.log("동기식이라 마지막에 실행될껄요?");