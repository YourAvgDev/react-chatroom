import React from "react";
import { formatRelative } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
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
        avatar={<Avatar aria-label="photo" src={photoURL}></Avatar>}
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
