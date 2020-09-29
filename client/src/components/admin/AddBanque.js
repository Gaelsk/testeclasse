import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
//core
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Label from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
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
    color: "#fff"
  }
});

function AddBanque({ classes, handleAddBanque }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState([]);
  const [file, setFile] = useState(null);
  //const [url, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { url, progress } = useStorage(file, "épreuves", loading);

  useEffect(() => {
    axios.get("/categories").then(res => {
      setCategories(res.data);
    });
    axios.get("/levels").then(res => {
      setLevels(res.data);
    });
  }, []);

  useEffect(() => {
    if (url) {
      const data = { name: file.name, category, level, url };
      console.log(data)
      axios
        .post("/banques", data)
        .then(res => {
          handleAddBanque(res.data);
          closeModal();
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        });
    }
  }, [url]);

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
    setCategory("");
    setLevel("");
    setFile(null);
  }
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  function handleLevelChange(e) {
    setLevel(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (file) {
      setLoading(true);

      /*axios
        .post("/banques", data)
        .then(res => {
          handleAddBanque(res.data);
          closeModal();
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        });*/
    }
  }
  return (
    <>
      <Button onClick={openModal} className="bg-primary white">
        <PlusIcon /> Ajouter une épreuve
      </Button>
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        className="dialog"
      >
        <DialogTitle>Ajouter une nouvelle épreuve</DialogTitle>
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
                className={classes.textField}
                name="file"
                hidden
                label="Fichier (Video, PDF...)"
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
                          Selectionner le fichier de l'épreuve
                        </Typography>
                      </div>
                    )}
                  </Box>
                </Paper>
              </label>
            </Box>

            <Box mt={3}>
              <Label>Matière</Label>
              <Select
                value={category}
                name="categories"
                onChange={handleCategoryChange}
                fullWidth
                className={classes.input}
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat._id} className={classes.option}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box mt={3}>
              <Label>Classe</Label>
              <Select
                value={level}
                name="levels"
                onChange={handleLevelChange}
                fullWidth
                className={classes.input}
              >
                {levels.map((level, i) => (
                  <option key={i} value={level._id} className={classes.option}>
                    {level.name}
                  </option>
                ))}
              </Select>
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

AddBanque.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddBanque: PropTypes.func
};
export default withStyles(styles)(AddBanque);
