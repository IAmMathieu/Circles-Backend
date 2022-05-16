const chatController = require("../controllers/chatController");
const formatMessage = require("./utils/messages");
const userUtils = require("./utils/users");

const botName = "Aleks";

exports = module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("joinRoom", ({ surname, room }) => {
      console.log(room);
      const user = userUtils.userJoin(socket.id, surname, room);

      socket.join(user.room);

      // Welcome current user
      socket.emit(
        "message",
        formatMessage(botName, "Welcome to your Circle Chatroom!")
      );

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(botName, `${user.surname} has joined the chat`)
        );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: userUtils.getRoomUsers(user.room),
      });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
      const user = userUtils.getCurrentUser(socket.id);

      chatController.sendMessageToDB(msg, socket.id, user.room);

      io.in(user.room).emit("message", formatMessage(user.surname, msg));
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      const user = userUtils.userLeave(socket.id);

      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage(botName, `${user.surname} has left the chat`)
        );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: userUtils.getRoomUsers(user.room),
        });
      }
    });
  });
};
