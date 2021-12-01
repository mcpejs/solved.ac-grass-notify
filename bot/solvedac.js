process.env.NTBA_FIX_319 = 1;
const request = require("request-promise-native");
const cheerio = require("cheerio");
const { CronJob } = require("cron");
const TelegramBot = require("node-telegram-bot-api");

const timezone = "Asia/Seoul";
process.env.TZ = timezone;

const token = process.env.TELEGRAM_BOT_TOKEN;
const myId = process.env.TELEGRAM_MY_ID;
const myName = process.env.NAME;

const bot = new TelegramBot(token, {
  polling: true,
});

const detectSolveHistoryCron = new CronJob(
  "0 10-23 * * *", // 오전 10시부터 오후 11시까지 정각에 실행
  detectSolveHistory,
  null,
  false,
  timezone
);

async function detectSolveHistory() {
  const solvedToday = await isSolvedToday(myName);
  if (!solvedToday) {
    const msg =
      "현재 시간 : " +
      todayYYMMDDHHMM() +
      `\n${myName}님은 오늘 문제를 제출하지 않으셨습니다!`;
    bot.sendMessage(myId, msg);
  }
}

async function isSolvedToday(username) {
  const grass = await getUserData(username);
  return grass.includes(todayYYMMDD());
}
async function getUserData(username) {
  const url = "https://solved.ac/profile/" + username;
  const body = await request(url);
  const $ = cheerio.load(body);
  const element = $("#__NEXT_DATA__");
  const data = element.html();
  return data;
  const json = JSON.parse(data);
  const grass = json.props.pageProps.grass.grass;
  return grass;
}

function defaultZero(num) {
  return 10 <= num ? num : "0" + num;
}
function todayYYMMDD() {
  const today = new Date();
  return (
    today.getFullYear() +
    "-" +
    defaultZero(today.getMonth() + 1) +
    "-" +
    defaultZero(today.getDate())
  );
}

function todayYYMMDDHHMM() {
  const today = new Date();
  return (
    today.getFullYear() +
    "-" +
    defaultZero(today.getMonth() + 1) +
    "-" +
    defaultZero(today.getDate()) +
    " " +
    defaultZero(today.getHours()) +
    ":" +
    defaultZero(today.getMinutes())
  );
}

bot.onText(/시작/, (msg, match) => {
  if (msg.chat.id != myId) return;
  detectSolveHistoryCron.start();
  const response = `알람 시작`;
  bot.sendMessage(myId, response);
});

bot.onText(/중지/, (msg, match) => {
  if (msg.chat.id != myId) return;
  detectSolveHistoryCron.stop();
  const response = `알람 중지`;
  bot.sendMessage(myId, response);
});

// when init bot
bot.sendMessage(myId, "서버 시작됨");
detectSolveHistory();
detectSolveHistoryCron.start();
