const users = [];

// Join user to chat
function userJoin(socketId, dbId, surname, room) {
  const user = { socketId, dbId, surname, room };

  let findUser = users.find((user) => user.socketId === id);
  const index = users.indexOf(findUser);

  if (!findUser) {
    users.push(user);
  } else {
    users[index] = user;
  }
  console.log(users);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.socketId === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.socketId === id);

  if (index !== -1) {
    users.splice(index, 1)[0];
    console.log(users);
    return users;
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function getdbIdBysocketId(socketId) {
  for (const user of users) {
    if (user.socketId === socketId) {
      return user.dbId;
    }
  }
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getdbIdBysocketId,
};
