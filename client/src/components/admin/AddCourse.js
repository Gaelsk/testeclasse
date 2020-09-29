import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
//core
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
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
import ImageIcon from "@material-ui/icons/Image";
import axios from "axios";
import useStorage from "../../hooks/useStorage";
import storage from "../../firebase"
import { validateCourseData } from "../../utils/validator"

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
    color: theme.palette.primary.main
  }
});

function AddCourse({ classes, handleAddCourse }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState([]);
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
    const { url, progress } = useStorage(file, "cours", loading);

  useEffect(() => {
    axios.get("/categories").then(res => {
      setCategories(res.data);
    });
    axios.get("/levels").then(res => {
      setLevels(res.data);
    });
  }, []);

  useEffect(() => {
    const data = {title, description, author, category, level}
    if (url) {
      data.url = url
      if(cover) {
        const coverRef = storage.ref().child(`couvertures/${cover.name}`);
        coverRef.put(cover).then(async coverUpload => {
          const coverUrl = await coverRef.getDownloadURL();
          data.cover = coverUrl;
      axios
        .post(`/courses`, data)
        .then(res => {
        setLoading(false);
        closeModal();
        handleAddCourse(res.data);
      })
      .catch(e => {
        console.error(e);
        setErrors(e.response.data);
        setLoading(false);
      });
        })
      } else {
        axios
        .post(`/courses`, data)
        .then(res => {
        setLoading(false);
        closeModal();
        handleAddCourse(res.data);
      })
      .catch(e => {
        console.error(e);
        setErrors(e.response.data);
        setLoading(false);
      });
      }
    }
  }, [url]);


  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
    setTitle("");
    setDescription("");
    setCategory("");
    setLevel("");
    setFile(null);
    setCover(null);
    setAuthor("");
  }
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  function handleCoverChange(e) {
    setCover(e.target.files[0]);
  }
  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  function handleLevelChange(e) {
    setLevel(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
        const data = {title, description, author, category, level, url: file};
    const {valid, errors } = validateCourseData(data);
    if(valid) {
      setLoading(true)
    } else {
      setErrors(errors)
    }
  }
  return (
    <>
      <Button onClick={openModal} className="bg-primary white">
        <PlusIcon /> Ajouter un cours
      </Button>
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        className="dialog"
      >
        <DialogTitle>Ajouter un nouveau cours</DialogTitle>
        {progress && (
          <div className="progress-container">
            <LinearProgress variant="determinate" value={progress} />
          </div>
        )}
        <DialogContent className={classes.dialogContent}>
          <form>
            <TextField
              type="text"
              className={classes.textField}
              name="title"
              label="Titre du cours"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="ex: Anglais pour les nuls"
              fullWidth
              error={errors && errors.title ? true : false}
              helperText={errors && errors.title}
            />
            <TextField
              type="text"
              className={classes.textField}
              name="description"
              label="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              multiline
              rows="2"
              placeholder="Décrivez le cours..."
              fullWidth
              error={errors && errors.description ? true : false}
              helperText={errors && errors.description}
            />

            <Box mt={3}>
              <Label htmlFor="category">Matière</Label>
              <Select
                value={category}
                name="categories"
                onChange={handleCategoryChange}
                fullWidth
                className={classes.input}
                id="category"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat._id} className={classes.option}>
                    {cat.name}
                  </option>
                ))}
              </Select>
              {errors && errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category}
                </Typography>
              )}
            </Box>
            <Box mt={3}>
              <Label htmlFor="level">Niveau</Label>
              <Select
                value={level}
                name="levels"
                onChange={handleLevelChange}
                fullWidth
                className={classes.input}
                id="level"
              >
                {levels.map((level, i) => (
                  <option key={i} value={level._id} className={classes.option}>
                    {level.name}
                  </option>
                ))}
              </Select>
              {errors && errors.level && (
                <Typography variant="caption" color="error">
                  {errors.level}
                </Typography>
              )}
            </Box>
            <TextField
              type="text"
              className={classes.textField}
              name="author"
              label="Auteur"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Nom de l'auteur"
              fullWidth
              error={errors && errors.author ? true : false}
              helperText={errors && errors.author}
            />
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
                <Label>Fichier du cours</Label>
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
                          Selectionner le fichier du cours
                        </Typography>
                      </div>
                    )}
                  </Box>
                </Paper>
              </label>
              {errors && errors.url && (
                <Typography variant="body2" color="error">
                  {errors.url}
                </Typography>
              )}
            </Box>
            <Box mt={4}>
              <input
                type="file"
                id="coverInput"
                className={classes.textField}
                name="cover"
                hidden
                onChange={handleCoverChange}
              />
              <label htmlFor="coverInput">
                <Label>Image de couverture</Label>
                <Paper className="upload">
                  <Box mr={1}>
                    {cover ? (
                      <Typography style={{ marginLeft: 6 }} variant="body2">
                        {cover.name}
                      </Typography>
                    ) : (
                      <div className="d-flex align-items-center">
                        <ImageIcon style={{ marginRight: 6 }} />
                        <Typography>
                          Selectionner l'image de couverture du cours
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

AddCourse.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddCourse: PropTypes.func.isRequired
};

export default withStyles(styles)(AddCourse);
