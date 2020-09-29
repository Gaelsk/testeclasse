import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "../utils/moment";
//icons
import Star from "@material-ui/icons/Star";
import CommentIcon from "@material-ui/icons/Forum";
import SendIcon from "@material-ui/icons/Send";
//component
import Layout from "../components/layout/Layout";
//redux
import { connect } from "react-redux";
import { getCourse, addComment } from "../redux/actions/course";
import Comments from "../components/course/Comments";
import Download from "../components/course/Download";
import { Container } from "@material-ui/core";
import ExerciceList from "../components/course/ExerciceList";
import AdModal from "../components/layout/AdModal";
//import CourseVideoComponent from "../components/course/CourseVideoComponent";
import Rate from "../components/course/RateCourse";
//styles
const styles = theme => ({
  container: {
    maxWidth: 1100,
    padding: 6,
    "& .padding": { padding: "8px 15px" },
    "& .cover": {
      height: 260,
      backgroundColor: "#f1f1f1",
      marginTop: 8
    },
    "& video": { marginTop: 8 },
    "& .header": { display: "flex", justifyContent: "space-between" },
    "& .icons": { display: "flex", justifyContent: "space-between" },
    "& .loading-course": { height: 200, width: "100%", display: "flex" },
    "& .icons svg": { fontSize: 17 },
    "& .feature": { marginRight: 16 },
    "& .feature svg": {
      fontSize: 18
    },
    "& .ml-1": { marginLeft: 6 }
  },
  card: { backgroundColor: "#fff", cursor: "pointer" },
  courseMedia: {
    width: "100%",
    height: 300,
    backgroundColor: "#ddd"
  },
  content: {
    padding: 12,
    "& .type": {
      display: "inline",
      backgroundColor: "#ddd",
      padding: 4,
      borderRadius: 5
    }
  },
  input: {
    backgroundColor: "#fff",
    padding: "0 6px",
    border: "1px solid #ddd",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.9
    }
  },
  divider: {
    marginTop: 24,
    marginBottom: 24
  },
  comments: {
    marginTop: 34
  },
  comment: {
    padding: 8,
    marginTop: 6
  },
  addingComment: { color: "#fff" }
});

function Course({
  classes,
  match,
  getCourse,
  course,
  loading,
  addComment,
  adding_comment
}) {
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(
    () => {
      getCourse(match.params.id.split("-").join(" "));
    },
    [
      /*match.params.id*/
    ]
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  function closeModal() {
    setShowModal(false);
  }
  function postComment() {
    if (commentText.length > 0) {
      addComment(course._id, commentText);
      setCommentText("");
    }
  }

  return (
    <Layout bgLight>
      <div className="ptop">
        <Container className={classes.container}>
          <AdModal isOpen={showModal} closeModal={closeModal} />
          {course && (
            <Grid container spacing={2}>
              <Grid item md={8} sm={12} style={{ width: "100%" }}>
                {loading && <Typography>Chargement....</Typography>}
                <Paper className="padding">
                  <div className="header">
                    <Typography variant="h5">{course.title}</Typography>
                    <Typography
                      className="hideForSmall"
                      color="textSecondary"
                      variant="caption"
                    >
                      {moment(course.createdAt).fromNow()}
                    </Typography>
                  </div>
                  <CardMedia
                    image={course.cover}
                    className="cover"
                  />
                  <Box mt={2} className="d-flex justify-content-between">
                    <div className="d-flex">
                      {course.rating && (
                        <div className="d-flex align-items-center feature align-items-center">
                          {Array.from({ length: Math.ceil(course.rating) }).map(
                            (_, i) => (
                              <Star key={i} color="primary" />
                            )
                          )}
                          {Array.from({
                            length: 5 - Math.ceil(course.rating)
                          }).map((_, i) => (
                            <Star key={i} />
                          ))}
                        </div>
                      )}
                      <div className="d-flex align-items-center feature align-items-center">
                        <CommentIcon />
                        <span style={{ marginLeft: 6 }}>
                          {course.commentsCount}
                        </span>

                        <div style={{ marginLeft: 10 }}>
                          <Download
                            title={course.title}
                            uri={course.url}
                            courseId={course._id}
                          />
                        </div>
                      </div>
                    </div>
                    {/*<div className="d-flex align-items-center feature align-items-center">
                                          {course.format === "Video" && (
                                            <div className="ml-1">
                                              <CourseVideoComponent courseTitle={course.title} video={video} />
                                            </div>
                                          )}
                                        </div>*/}
                  </Box>

                  <Box mt={2}>
                    <Typography>{course.description}</Typography>
                  </Box>
                  <Box mt={2}>
                    {course.author && (
                      <Typography variant="body2">
                        <u>Professeur:</u> {course.author}
                      </Typography>
                    )}
                    <div style={{ marginTop: 8 }}>
                      <Rate courseId={course._id} />
                    </div>
                  </Box>
                  <Divider className={classes.divider} />
                  <div className={classes.comments}>
                    <Typography>Commentaires</Typography>

                    <Box mt={2} mb={2} className="d-flex">
                      <Input
                        className={classes.input}
                        fullWidth
                        placeholder="Ecrire un commentaire..."
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                      />
                      <Button onClick={postComment} className={classes.btn}>
                        {!adding_comment && <SendIcon />}
                        {adding_comment && (
                          <CircularProgress
                            size={24}
                            className={classes.addingComment}
                          />
                        )}
                      </Button>
                    </Box>

                    <Comments comments={course.comments} />
                  </div>
                </Paper>
              </Grid>
              <Grid item md={4} sm={12}>
                <ExerciceList course={course} />
              </Grid>
            </Grid>
          )}
        </Container>
      </div>
    </Layout>
  );
}

Course.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  course: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  addComment: PropTypes.func.isRequired,
  adding_comment: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  course: state.course.course,
  loading: state.course.loading_course,
  adding_comment: state.course.adding_comment
});

const mapDispatchToProps = {
  getCourse,
  addComment
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Course)
);
