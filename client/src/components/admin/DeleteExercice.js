import React, { useState } from "react";
import PropTypes from "prop-types";
import Btn from "../layout/Btn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
//redux
import axios from "axios";
import { connect } from "react-redux";
import storage from "../../firebase"


function DeleteExercice({ handleDeleteExercice, courseId, url, isAdmin, index }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function deleteExercice() {
    const x = url.split("/")[url.split("/").length - 1];
    const y = x.split("?")[0]
    const name = y.split("%2F")[y.split("%2F").length -1]
    storage.ref().child(`exercices/${name}`).delete().then(res => {
      axios.delete(`/courses/${courseId}/exercices/${index}`).then(() => {
      handleDeleteExercice(index);
      handleClose();
    });
    })
  }

  return (
    <>
      {isAdmin ? (
        <Btn tip="Supprimer cet exercice" onClick={handleOpen}>
          <DeleteOutline fontSize="small" color="secondary" />
        </Btn>
      ) : null}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Etes-vous sûr de vouloir supprimer cet exercice?
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Non
          </Button>
          <Button color="secondary" onClick={deleteExercice}>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteExercice.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  handleDeleteExercice: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isAdmin: state.user.user && state.user.user.role === "admin"
});

export default connect(mapStateToProps)(DeleteExercice);
