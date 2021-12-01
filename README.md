# solved.ac-grass-notify
solved.ac 연속 해결이 끊기지 않도록 알려주는 텔레그램 알람 서비스 입니다.

## 작동 예시

미리 작성된 crontab으로 작동하며 오전 10시부터 오후 11시까지 정각마다 문제를 제출하지 않았다면 알람을 보내줍니다

![image](https://user-images.githubusercontent.com/15870158/144160623-54f77931-cb2a-4c6a-9dd0-64a687da3224.png)

만약 오늘 문제를 풀었다면 알람은 더 이상 오지 않습니다.

![image](https://user-images.githubusercontent.com/15870158/144218291-5f6eba92-3104-47b9-8939-c4eafb852e0e.png)

## 사용법
이 프로그램을 사용할려면 아래의 목록이 필요합니다. 

각각 클릭하면 찾는 방법이 나옵니다
* [자신의 텔레그램 봇 토큰](TELEGRAM.md#텔레그램-봇-토큰-얻기)
* [자신의 텔레그램 아이디](TELEGRAM.md#텔레그램-아이디-찾기)
* 자신의 백준 아이디

위의 목록이 준비되었다면 아래를 참고해서 환경변수로 넣어주세요

    TELEGRAM_BOT_TOKEN    자신의 텔레그램 봇 토큰
    TELEGRAM_MY_ID        자신의 텔레그램 아이디
    NAME                  자신의 백준 아이디

`dotenv` 패키지가 있으니 .env 파일을 만들어서 설정해도 됩니다.

![image](https://user-images.githubusercontent.com/15870158/144162827-89016fa7-06ac-4f78-9bae-1cfc9b0cd17d.png)
 
환경변수 설정이 끝났다면 다음을 입력해  시작합니다

    npm install
    npm run start
