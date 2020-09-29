import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
//core
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Label from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

//icons
import PlusIcon from "@material-ui/icons/Add";
import UploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import Btn from "../utils/Btn";
import useStorage from "../../hooks/useStorage";


const styles = theme => ({
  dialogContent: {
    "& .upload": {
      padding: "6px 16px",
      cursor: "pointer",
      backgroundColor: "#f5f5f5"
    }
  },
  textField: {
    marginTop: 10
  },
  option: {
    paddingLeft: 14,
    padding: 8,
    "&:hover": {
      backgroundColor: "#f1f1f1"
    }
  },
  submitBtn: {
    marginRight: 14,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  progress: {
    position: "absolute",
    color: "#fff"
  }
});

function AddExercice({ classes, handleAddExercices, courseId }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const { url, progress } = useStorage(file, "exercices", loading);
  useEffect(() => {
    if (url) {
      saveExercice()
    }
  }, [url]);

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
    setFile(null);
  }
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  function saveExercice() {
    const data = { url, name: file.name };
      axios
        .post(`/courses/${courseId}/exercices`, data)
        .then(res => {
          setLoading(false);
          closeModal();
          handleAddExercices(res.data);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        });
      setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
  }
  return (
    <>
      <Btn tip="Ajouter un exercice" onClick={openModal}>
        <PlusIcon />
      </Btn>
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        className="dialog"
      >
        <DialogTitle>Ajouter un nouveau exercice</DialogTitle>
        {progress && (
          <div className="progress-container">
            <LinearProgress variant="determinate" value={progress} />
          </div>
        )}
        <DialogContent className={classes.dialogContent}>
          <form>
            <Box mt={4} mb={2}>
              <input
                type="file"
                id="fileInput"
                name="file"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput">
                <Label>Fichier du cours</Label>
                {file&& (
                  <Paper className="upload">
                          <Box mr={1}>
                            <Typography
                              style={{ marginLeft: 6 }}
                              variant="body2"
                            >
                              {file.name}
                            </Typography>
                          </Box>
                        </Paper>
                )}
                <Paper className="upload">
                  <Box mr={1}>
                    <div className="d-flex align-items-center">
                      <UploadIcon style={{ marginRight: 6 }} />
                      <Typography>
                        {file
                          ? "Resélectionner l'exercice"
                          : "Selectionner l'exercice"}
                      </Typography>
                    </div>
                  </Box>
                </Paper>
              </label>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Box mt={2} mb={2}>
            <Button
              color="primary"
              variant="contained"
              className={`${classes.submitBtn} white`}
              onClick={handleSubmit}
              type="submit"
            >
              Ajouter
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
            <Button
              style={{ marginRight: 14 }}
              variant="contained"
              color="secondary"
              onClick={closeModal}
            >
              Annuler
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

AddExercice.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddExercices: PropTypes.func.isRequired
};

export default withStyles(styles)(AddExercice);
