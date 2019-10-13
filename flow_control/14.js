// 삼각형 출력하기 - pattern 4

var line = 5;
var star = '';

for (var i = 0; i < line; i++) {
  for (var j = 0; j < line; j++) {
    if (j + i >= 4) {
      star += '*';
    } else {
      star += ' ';
    }
  }
  star += '\n';
}

console.log(star);
