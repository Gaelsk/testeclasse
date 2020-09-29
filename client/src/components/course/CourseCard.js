import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
//styles
const styles = theme => ({
  card: {
    backgroundColor: "#fff",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 0 6px 0 rgba(0,0,0,0.3)"
    }
  },
  courseMedia: {
    width: "100%",
    height: 120,
    backgroundColor: "#ddd"
  },
  content: {
    padding: 12,
    "& .footer": {
      marginTop: 10
    },
    "& .format": {
      display: "inline",
      backgroundColor: "#ddd",
      padding: 4,
      borderRadius: 5
    }
  }
});

function CourseCard({ classes, course }) {
  const description =
    course.description.length > 59
      ? `${course.description.substring(0, 59)}...`
      : course.description;
  const to = `/cours/${course.title
    .toLowerCase()
    .split(" ")
    .join("-")}`;
  return (
    <Card component={Link} to={to} className={classes.card}>
      <CardMedia
        image={course.cover}
        alt=""
        className={classes.courseMedia}
      />
      <CardContent className={classes.content}>
        <div className="d-flex">
          <Typography variant="body2" color="primary">
            {course.category.name}
          </Typography>{" "}
          <span style={{ margin: "-3px 6px 0px" }}> - </span>
          <Typography variant="body2" color="primary">
            {course.level.name}
          </Typography>
        </div>
        <Typography className="bold">{course.title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <div className="footer">
          <Typography variant="caption" className="format">
            {course.format}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(CourseCard);
