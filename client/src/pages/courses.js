import React, { useEffect } from "react";
//import { useParams } from "react-router-dom";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

//components
import Filter from "../components/layout/Filter";
import CourseCard from "../components/course/CourseCard";
import Layout from "../components/layout/Layout";
//redux
import { connect } from "react-redux";
import { getCourses } from "../redux/actions/course";

const styles = theme => ({
  courselistcontainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: 20,

    [theme.breakpoints.down(968)]: {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
    [theme.breakpoints.down(728)]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    [theme.breakpoints.down(498)]: {
      gridTemplateColumns: "1fr"
    }
  }
});

function Courses({ classes, getCourses, courses, loading, match }) {
  //const { category } = useParams();
  const { category } = match.params;
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <Layout bgLight>
      <div className="container ptop">
        <Filter categoryParams={category} />
        {courses.length > 0 && (
          <Box mt={2} mb={2}>
            <Typography>
              {courses.length} cours trouvé
              {courses.length > 1 ? "s" : ""}.
            </Typography>
          </Box>
        )}
        <Grid id="courses" className={classes.courselistcontainer}>
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <Card className="courseCardSkeleton" key={i}></Card>
            ))}
        </Grid>
        {!loading && courses.length === 0 && (
          <Typography>
            Aucun cours ne correspond à vos recherches pour le moment...
          </Typography>
        )}
      </div>
    </Layout>
  );
}

const mapStateToProps = state => ({
  courses: state.course.courses,
  loading: state.course.loading
});

const mapDispatchToProps = {
  getCourses
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Courses)
);
