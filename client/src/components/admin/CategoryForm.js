import React, { useState } from "react";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//icons
import PlusIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import axios from "axios";
import Btn from "../layout/Btn";

const styles = theme => ({
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
  plusIcon: {},
  submitBtn: {
    marginRight: 14,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  }
});

function AddCategory({
  classes,
  handleAddCategory,
  id,
  category_name,
  handleUpdateCategory
}) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  function openModal() {
    setOpen(true);
    setName(category_name || "");
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (error) setError("");
    if (!id) {
      axios
        .post("/categories", { name })
        .then(res => {
          handleAddCategory(res.data);
          setName("");
          closeModal();
        })
        .catch(e => setError(e.response.data.error));
    } else {
      if (category_name !== name) {
        axios
          .put(`/categories/${id}`, { name })
          .then(res => {
            handleUpdateCategory(res.data);
            setName("");
            closeModal();
          })
          .catch(e => setError(e.response.data.error));
      }
    }
  }
  return (
    <>
      {!id ? (
        <Button onClick={openModal} className="bg-primary white">
          <PlusIcon /> Ajouter une matière
        </Button>
      ) : (
        <Btn onClick={openModal} tip="Modifier">
          <EditIcon />
        </Btn>
      )}
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        className="dialog"
      >
        <DialogTitle>
          {!id ? (
            <>Ajouter une nouvelle matière</>
          ) : (
            <>Modifier cette matière</>
          )}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <form>
            <TextField
              type="text"
              className={classes.textField}
              name="name"
              label="Nom de la matière"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex: Français"
              fullWidth
              error={error.length > 0 ? true : false}
              helperText={error}
            />
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
              {!id ? <>Ajouter</> : <>Modifier</>}
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
AddCategory.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  handleAddCategory: PropTypes.func,
  handleUpdateCategory: PropTypes.func
};
export default withStyles(styles)(AddCategory);
