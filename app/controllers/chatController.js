const chatDatamapper = require("../datamapper/chatDatamapper");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getdbIdBysocketId,
} = require("../../utils/users");
const res = require("express/lib/response");

const chatController = {
  homepage(req, res) {
    res.render("view");
  },

  chatPage(req, res) {
    const { surname, user_id, room } = req.query;
    res.render("chat", { room });
  },

  async sendMessageToDB(msg, socketId, room) {
    const userId = getdbIdBysocketId(socketId);
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
