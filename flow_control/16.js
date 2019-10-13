// 역정삼각형 출력하기

var star = '';

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < i; j++) {
    star += ' ';
  }
  for (var k = 9; k > i * 2; k--) {
    star += '*';
  }
  star += '\n';
}

console.log(star);
