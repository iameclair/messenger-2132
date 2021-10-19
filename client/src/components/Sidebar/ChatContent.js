import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextBold: {
    fontSize: 14,
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  count: {
    marginRight: 10,
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, countOfUnreadMessages, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box>
          <Typography className={classes.username}>
            {otherUser.username}
          </Typography>
          <Typography className={countOfUnreadMessages > 0 ? classes.previewTextBold : classes.previewText}>
            {latestMessageText}
          </Typography>
        </Box>
        { countOfUnreadMessages > 0 && (
          <Box className={classes.count}>
            <Badge badgeContent={countOfUnreadMessages} color="primary"/>
          </Box>)
        }
      </Box>
    </Box>
  );
};

export default ChatContent;
