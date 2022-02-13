module.exports.config = {
  name: "adminboxonly",
  version: "1.1.5",
  hasPermssion: 1,
  credits: "ProCoderMew",
  description: "Cài đặt bot về chế độ chỉ QTV nhóm có thể sử dụng bot",
  commandCategory: "QTV-box",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, Threads }) {
  const { threadID, messageID } = event;
  const fs = require('fs-extra');
  const oa = require('./cache/oa.json');
  const threadInfo = await api.getThreadInfo(event.threadID);
	await Threads.setData(event.threadID, { name: threadInfo.name, threadInfo });
	global.data.threadInfo.set(event.threadID, threadInfo);
  if (!oa[threadID] || oa[threadID] === false) oa[threadID] = true;
  else oa[threadID] = false;
  fs.writeFileSync(__dirname + '/cache/oa.json', JSON.stringify(oa, null, 2))
  return api.sendMessage(`[ MODE ] » Đã ${(oa[threadID] == true) ? "bật" : "tắt"} chế độ quản trị viên nhóm.`, threadID, messageID);
}
