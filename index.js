var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket) => {

  socket.on("sendCommentPost", (data) => {
    socketIo.emit(`receiveCommentPost.${data.postCommentPost.id}`, data);
  });

  socket.on("sendFeelCommentPost", (data) => {
    socketIo.emit(`receiveFeelCommentPost.${data.commentPostFeelComment.id}`, data);
  });

  socket.on("sendFeelPost", (data) => {
    socketIo.emit(`receiveFeelPost.${data.postFeelPost.id}`, data);
  });

  socket.on("sendMessage", (data) => {
    socketIo.emit(`receiveMessage.${data.groupMessageMessage.id}`, data);
  });

  socket.on("callVideo", (id) => {
    socketIo.emit(`callVideo.${id}`, id);
  });

  socket.on("sendMessageOnline", (data) => {
    socketIo.emit(`receiveMessageOnline.${data.receive.id}`, data);
  });

  socket.on("sendChangeBackground", (data) => {
    socketIo.emit(`receiveChangeBackground.${data.groupMessageMessage.id}`, data);
  });

  socket.on("sendChangeEmojii", (data) => {
    socketIo.emit(`receiveChangeEmojii.${data.groupMessageMessage.id}`, data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 4444, () => {
  console.log("Server running port 4444");
});
