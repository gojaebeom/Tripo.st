scss 파일을 css 파일로 변환하는 방법 🍰

""" log📜
scss 디렉토리 내부에 많은 scss 파일들이 존재하지만 이 파일들은 style.scss 파일 하나에 모두 import 되어있습니다.
즉 style.scss 파일 하나만 style.css 파일로 변환하는 작업을 해주면 됩니다.

먼저 scss 파일을 변환하기 위해 귀하의 os에 nodejs가 설치되어있어야 합니다. 
로컬에 node가 설치되어 있지 않다면 👉👉 https://nodejs.org/ko/ 사이트에 방문하여 안정버전, 또는 최신 버전을 다운 받아주십쇼.


node가 깔리면 npm 이라는 node package manager 도 같이 깔리게 됩니다. npm을 통해 귀하의 로컬 전역에 node-sass를 다운받아 주세요.
1. cmd를 열고 npm install node-sass -g
(-g 옵션은 로컬 전역환경에 다운을 받겠다는 뜻입니다.)
2. 준비가 끝났습니다. cmd가 Tripo app의 root derectory를 가리키고 있다면 다음 명령어로 scss 파일을 style 파일로 즉시 변환해줍니다.
   덤으로 --watch 옵션을 추가하여 실시간으로 수정한 내용을 바로바로 style 파일에 적용해줍니다. 
3. node-sass --watch  ./static/scss/style.scss ./static/css/style.css 
위의 내용은 node-sass를 통해 /static/scss/위치의 style.scss 파일을 /static/css/style.css 파일로 변환 시키는 명령어 입니다. 
추출할 css 파일이 해당 경로에 존재하지 않으면 새로 생성하게 됩니다!

4. 이제 style.css 파일을 직접 건드리지 않고 scss 파일을 수정하여 조금더 편하게 프로젝트의 UI를 개선할 수 있습니다! 👏👏
"""