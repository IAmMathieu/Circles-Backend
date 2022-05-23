const userDataMapper = require("../../datamapper/userDatamapper");

const users = [];

const usersUtils = {
  // Join user to chat
  async userJoin(socketId, dbId, surname, room) {
    const dbUser = await userDataMapper.getUserInfo(dbId);
    const img_url = dbUser.img_url;

    const user = { socketId, dbId, surname, img_url, room };

    const findUser = users.find(
      (findUser) => findUser.socketId === user.socketId
    );
    const index = users.indexOf(findUser);

    if (!findUser) {
      users.push(user);
    } else {
      users[index] = user;
    }
    return user;
  },

  // Get current user
  getCurrentUser(id) {
    return users.find((user) => user.socketId === id);
  },

  // User leaves chat
  userLeave(id) {
    const index = users.findIndex((user) => user.socketId === id);

    if (index !== -1) {
      users.splice(index, 1)[0];
      // console.log(users);
      return users;
    }
  },

  // Get room users
  getRoomUsers(room) {
    return users.filter((user) => user.room === room);
  },

  getdbIdBysocketId(socketId) {
    for (const user of users) {
      if (user.socketId === socketId) {
        return user.dbId;
      }
    }
  },
};

module.exports = usersUtils;
