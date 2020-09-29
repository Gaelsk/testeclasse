import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";

import Typography from "@material-ui/core/Typography";
import DeleteComment from "./DeleteComment";
import Avatar from "../layout/Avatar";

const styles = {
  commentData: {
    position: "relative",
    paddingLeft: 4,
    "& .userImg": {
      marginRight: 10
    },
    "& .comment-text": {
      marginLeft: 54
    },
    "& .createdAt": {
      fontSize: 12,
      color: "#777"
    }
  },
  separator: {
    margin: 4
  }
};

const Comments = ({ comments, classes }) => {
  return (
    <div>
      {comments &&
        comments.map((comment, index) => {
          const {
            _id,
            text,
            createdAt,
            user: { username }
          } = comment;
          return (
            <div key={_id}>
              <div className={classes.commentData}>
                <div className="d-flex">
                  <div className="userImg">
                    <Avatar name={username} size={25} />
                  </div>
                  <div style={{ marginLeft: 6 }}>
                    <Typography
                      variant="body1"
                      color="primary"
                      className="responsiveText"
                    >
                      {username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="createdAt"
                    >
                      {moment(createdAt).format("hh:mm, DD MMM YYYY")}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="body1"
                  className="responsiveText comment-text"
                >
                  {text}
                </Typography>

                <DeleteComment username={username} id={_id} />
              </div>
              {index !== comments.length - 1 && (
                <hr className={classes.separator} />
              )}
            </div>
          );
        })}
    </div>
  );
};
export default withStyles(styles)(Comments);
