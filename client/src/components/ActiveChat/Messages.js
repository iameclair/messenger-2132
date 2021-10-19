import React, {useEffect, useState} from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const size = messages.length;
  const [ lastReadIndex, setLastReadIndex] = useState(size-1);

  useEffect(() => {
    if (size > 0 && !messages[size-1].read) {
      for (let i = size -1 ; i >=0; i--) {
        if (messages[i].read) {
          setLastReadIndex(i);
          break;
        }
      }
    }
  }, [messages])

  return (
    <Box>
      {messages.map((message, index) => {
        message.lastRead = index === lastReadIndex;
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
              lastRead={message.lastRead}
          />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
