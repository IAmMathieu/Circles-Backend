const chatDatamapper = require("../datamapper/chatDatamapper");
const usersUtils = require("../services/utils/users");
const res = require("express/lib/response");

const chatController = {
  async sendMessageToDB(msg, socketId, room) {
    const userId = usersUtils.getdbIdBysocketId(socketId);
    // console.log("msg:" + msg);
    // console.log("userId:" + userId);
    // console.log("room:" + room);

    const sendMessage = await chatDatamapper.addMessageInCircle(
      msg,
      userId,
      room
    );
    if (!sendMessage) {
    }
  },
};

module.exports = chatController;
