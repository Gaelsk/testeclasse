import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
//core
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Label from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import PlusIcon from "@material-ui/icons/Add";
import UploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import useStorage from "../../hooks/useStorage";

const styles = theme => ({
  dialogContent: {
    "& .upload": {
      padding: "6px 16px",
      cursor: "pointer",
      backgroundColor: "#f5f5f5",
      marginTop: 6
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
    color: theme.palette.primary.main
  }
});

function AddAd({ classes, handleAddAd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
    const { url, progress } = useStorage(file, "pubs", loading);

useEffect(() => {
        const data = { title, content };

    if (file && url) {
      data.img = url
      axios
        .post("/ads", data)
        .then(res => {
          handleAddAd(res.data);
          closeModal();
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        })
    } else {
      axios
        .post("/ads", data)
        .then(res => {
          handleAddAd(res.data);
          closeModal();
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        })
    }
  }, [url]);

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
    setTitle("");
    setContent("");
    setFile(null);
  }
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (title.length > 0 && content.length > 0) {
      setLoading(true);
    }
  }
  return (
    <>
      <Button onClick={openModal} className="bg-primary white">
        <PlusIcon /> Créer une publicité
      </Button>
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        className="dialog"
      >
        <DialogTitle>Créer une nouvelle publicité</DialogTitle>
        <div className="progress-container">
          {progress && (
            <LinearProgress variant="determinate" value={progress} />
          )}
        </div>
        <DialogContent className={classes.dialogContent}>
          <form>
            <titleField
              type="text"
              className={classes.textField}
              name="name"
              label="Titre"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Titre de la publicité"
              fullWidth
            />
            <TextField
              type="text"
              className={classes.textField}
              name="name"
              label="Contenu"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Contenu de la publicité"
              fullWidth
              multiline
              rows="2"
            />
            <Box mt={4} mb={2}>
              <input
                type="file"
                id="fileInput"
                className={classes.textField}
                name="file"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput">
                <Label>Fichier de l'épreuve</Label>
                <Paper className="upload">
                  <Box mr={1}>
                    {file ? (
                      <Typography style={{ marginLeft: 6 }} variant="body2">
                        {file.name}
                      </Typography>
                    ) : (
                      <div className="d-flex align-items-center">
                        <UploadIcon style={{ marginRight: 6 }} />
                        <Typography>
                          Selectionner l'image de la publicité (Optionnel)
                        </Typography>
                      </div>
                    )}
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
              Créer
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}{" "}
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

AddAd.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddAd: PropTypes.func
};
export default withStyles(styles)(AddAd);
