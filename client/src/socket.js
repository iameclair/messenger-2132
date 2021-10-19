import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import {fetchConversations} from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    //if active conversation is currently set to the sender username
    // we assume that the receiver has read the message
    const { activeConversation, conversations, user } = store.getState();
    const { message } = data;
    for (let convo of conversations) {
      if (convo.id === message.conversationId) {
        const { otherUser } = convo;
        if (otherUser.username === activeConversation) {
          message.read = true;
          //send notification to sever to update the message read status
          socket.emit("message-read", {
            conversationId: convo.id,
            senderId: convo.otherUser.id
          })
        }
      }
    }
    store.dispatch(setNewMessage(message, data.sender, user.id));
  });

  socket.on("notify-message-read", (data) => {
    if (store.getState().user.id === data.userId) {
      store.dispatch(fetchConversations())
    }
  })
});

export default socket;
