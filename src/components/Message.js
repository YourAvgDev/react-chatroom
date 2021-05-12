import React from "react";
// import {formatRelative} from 'date-fns';

// function Message({createdAt= null,
//     text ='',
//     displayName = "",
//     photoURL = ""}) {
//     return (
//         <div>
// {
//   photoURL ? <img src={photoURL} alt="Avatar" width={45} /> : null;
// }
// {
//   displayName ? <p> {displayName}</p> : null;
// }
// {
//   createdAt?.seconds ? (
//     <span>
//       {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
//     </span>
//   ) : null;
// }
//             <p>{text}</p>
//         </div>
//     )
// }

// export default Message;
import { formatRelative } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Message({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="photo"
            className={classes.avatar}
            src={photoURL}
          ></Avatar>
        }
        title={displayName ? displayName : null}
        subheader={
          createdAt?.seconds
            ? formatRelative(new Date(createdAt.seconds * 1000), new Date())
            : null
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
