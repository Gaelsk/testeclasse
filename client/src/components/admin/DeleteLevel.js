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

function DeleteLevel({ handleDeleteLevel, id, isAdmin }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function deleteLevel() {
    axios.delete(`/levels/${id}`).then(() => {
      handleDeleteLevel(id);
      handleClose();
    });
  }

  return (
    <>
      {isAdmin ? (
        <Btn tip="Supprimer cette classe" onClick={handleOpen}>
          <DeleteOutline fontSize="small" color="secondary" />
        </Btn>
      ) : null}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Etes-vous sûr de vouloir supprimer cette classe?
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Non
          </Button>
          <Button color="secondary" onClick={deleteLevel}>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteLevel.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  handleDeleteLevel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isAdmin: state.user.user && state.user.user.role === "admin"
});

export default connect(mapStateToProps)(DeleteLevel);
