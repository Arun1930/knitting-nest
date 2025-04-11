const socketIO = require("socket.io");


module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  let users = [];
  const messages = {};

  const addUser = (userId, socketId) => {
    if (!users.some((user) => user.userId === userId)) {
      users.push({ userId, socketId });
    }
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (receiverId) => users.find((user) => user.userId === receiverId);

  const createMessage = ({ senderId, receiverId, text, images }) => ({
    senderId,
    receiverId,
    text,
    images,
    seen: false,
  });

  io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
      const message = createMessage({ senderId, receiverId, text, images });
      const user = getUser(receiverId);

      if (!messages[receiverId]) {
        messages[receiverId] = [message];
      } else {
        messages[receiverId].push(message);
      }

      io.to(user?.socketId).emit("getMessage", message);
    });

    socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
      const user = getUser(senderId);
      const msgArr = messages[senderId] || [];
      const message = msgArr.find(
        (msg) => msg.receiverId === receiverId && msg.id === messageId
      );
      if (message) {
        message.seen = true;
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    });

    socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
      io.emit("getLastMessage", {
        lastMessage,
        lastMessagesId,
      });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
