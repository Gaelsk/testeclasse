import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";

//components
import CourseCard from "../components/course/CourseCard";
//icons
import Icon from "@material-ui/icons/Book";

import Layout from "../components/layout/Layout";
//redux
import { connect } from "react-redux";
import { getCourses } from "../redux/actions/course";
import axios from "axios";

const styles = theme => ({
  hero: {
    position: "relative",
    [theme.breakpoints.down(600)]: {
      height: "80vh"
    },
    "& .cover": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      color: "#fff"
    },
    "& .content": {
      position: "absolute",
      top: "calc(19% + 5vmin)",
      left: "9.5%",
      maxWidth: 600
    },
    "& h2": {
      [theme.breakpoints.down(600)]: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 24,
        marginBottom: 12
      }
    },
    "& h6": {
      [theme.breakpoints.down(600)]: {
        fontSize: 16
      }
    },
    "& .cta": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      marginTop: 26
    }
  },

  heroImg: {
    width: "100%",
    height: "92vh",
    objectFit: "cover",
    backgroundRepeat: "no-repeat"
  },
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
  },
  categoriesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: 20,
    marginTop: 8,
    paddingBottom: 15,
    [theme.breakpoints.down(968)]: {
      gridTemplateColumns: "repeat(4, 1fr)"
    },
    [theme.breakpoints.down(728)]: {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
    [theme.breakpoints.down(498)]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      fontSize: 12
    },
    "& .categoryCard": {
      textAlign: "center",
      minHeight: 100,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  section: {
    marginTop: 50
  }
});

var items = [
  {
    url: require("../images/1.jpg"),
    header: "Accès gratuit à une multitude de cours",
    text:
      "Nous mettons à votre disposition des cours gratuits et téléchargeables en plusieurs formats. Faites votre choix et commencez votre apprentissage dès maintenant.",
    cta: (
      <Button component={Link} to="/cours" className="cta">
        Voir nos cours
      </Button>
    )
  },
  {
    url: require("../images/4.jpg"),
    header: "Etudiez depuis le confort de chez vous.",
    text:
      "Apprenez n'importe où et n'importe quand, grâce à nos cours spécialement réalisés par des professionels de l'enseignement.",
    cta: (
      <Button component={Link} to="/cours" className="cta">
        Découvrez nos cours
      </Button>
    )
  }
];


function Home({ classes, getCourses, courses, loading }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getData()
  }, []);
  function getData() {
    getCourses(null, 4);
    axios
      .get("/categories")
      .then(res => setCategories(res.data))
      .catch(e => setCategories([]));
  }
  return (
    <Layout>
      <div className={classes.hero}>
            <div className="cover">
              <div className="content">
                <Typography variant="h2">Accès gratuit à une multitude de cours</Typography>
                <Typography variant="h6">Apprenez n'importe où et n'importe quand, grâce à nos cours spécialement réalisés par des professionels de l'enseignement.</Typography>
                <Button component={Link} to="/cours" className="cta">
        Découvrez nos cours
      </Button>
              </div>
            </div>

            <img className={classes.heroImg} src={require("../images/kid.jpg")} alt="" />
          </div>

      <div className="container">
        <Box mt={6} mb={6}>
          <div className="d-flex justify-content-between align-items-center">
            <Typography variant="h4">Nouveaux cours</Typography>
            {courses.length > 4 && (
              <Typography className="underlined" component={Link} to="/cours">
                Voir tout
              </Typography>
            )}
          </div>
        </Box>
                    {!loading && courses.length === 0 && <Typography>Aucun cours n'est disponible pour le moment</Typography>}

        <Grid id="courses" className={classes.courselistcontainer}>
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <Card className="courseCardSkeleton" key={i}></Card>
            ))}
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} showLevel />
          ))}
        </Grid>
      </div>
      <div
        className="bg-light"
        style={{ backgroundColor: "#f1f1f1", marginTop: 16 }}
      >
        <div className="container">
          <Grid className={classes.section}>
            <Typography variant="h4">Matières</Typography>
            <div className={classes.categoriesContainer}>
              {categories.map(cat => (
                <Card
                  key={cat._id}
                  //component={Link}
                  //to={`/cours/matiere/${cat.name}`}
                  className="categoryCard"
                >
                  <Icon color="secondary" />
                  <p style={{ fontWeight: "bold" }}>{cat.name}</p>
                </Card>
              ))}
            </div>
          </Grid>
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
