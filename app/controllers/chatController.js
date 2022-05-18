const chatDatamapper = require("../datamapper/chatDatamapper");
const usersUtils = require("../services/utils/users");

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

  async updateMessage(req, res) {
    const messageId = req.params.message_id;
    const updatedMessage = await chatDatamapper.updateMessage(
      messageId,
      req.body
    );

    res.json(updatedMessage);
  },

  async deleteMessage(req, res) {
    const messageId = req.params.message_id;
    const deletedMessage = await chatDatamapper.deleteMessage(
      messageId,
      req.body
    );

    if (deletedMessage) {
      res.status(200).send("Message successfully deleted.");
    } else {
      res.status(400).send("Bad request or incorrect informations");
    }
  },
};

module.exports = chatController;
