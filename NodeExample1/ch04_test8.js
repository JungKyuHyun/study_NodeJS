var fs = require("fs");

//파일에 데이터를 씁니다.
fs.open("./output.txt", "a+", function(err, fd){
    if(err) throw err;
    
    //규현 임의 추가
    var notNum = "안녕\n반가워!@";
    if(typeof notNum === "number"){
        // throw new Error("숫자는 Buffer.alloc를 사용하셍요ㅣ");
        console.log("숫자는 사용불가.");
        return;
    }
    
    var buf = new Buffer.from(notNum, "utf-8"); 
    //보안문제로 buffer.alloc(number) or Buffer.from(String) 사용
    
   

    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer){
        if(err) throw err;

        console.log(err, written, buffer);

        fs.close(fd, function(){
            console.log("파일 열고 데이터 쓰고 파일 닫기 완료.");
        });
    });
});