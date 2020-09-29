import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

import Alert from "@material-ui/lab/Alert";

import Download from "./Download";
import { connect } from "react-redux";
import AddExercice from "../admin/AddExercice";
import DeleteExercice from "../admin/DeleteExercice";

const useStyles = makeStyles(() => ({
  exerciceCard: {
    padding: "10px 12px",
    marginBottom: 12
  }
}));

function ExerciceList({ course, user }) {
  const classes = useStyles();
  const [exercices, setExercices] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    setExercices(course.exercices);
  }, [course]);
  function handleAddExercices(exercice) {
    const array = [...exercices, exercice];
    setExercices(array);
    const msg = "Exercice ajouté avec succès"
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function handleDeleteExercice(index) {
    const exercicesUpdated = exercices.filter((_, i) => i !== index)
    setExercices(exercicesUpdated)
  }
  return (
    <>
      {message && (
        <Box mb={2}>
          <Alert className="alert-message">{message}</Alert>
        </Box>
      )}
      <Box mb={2} className="d-flex justify-content-between">
        <Typography variant="h5">Exercices</Typography>
        {user && user.role === "admin" && (
          <AddExercice
            handleAddExercices={handleAddExercices}
            courseId={course._id}
          />
        )}
      </Box>

      {exercices.map((exo, i) => {
        console.log(exo)
        return(
              <Card key={i} className={classes.exerciceCard}>
                <Typography>Exercice n° {i + 1}</Typography>
                <Download icon uri={exo.url} title={`${course.name}_exercice${i}`} />
                <DeleteExercice url={exo.url} name={exo.name} handleDeleteExercice={handleDeleteExercice} courseId={course._id} index={i} />
              </Card>
            )})}
    </>
  );
}

ExerciceList.propTypes = {
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(ExerciceList);
