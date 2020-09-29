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

function DeleteBanque({ handleDeleteBanque, id, name, isAdmin }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function deleteBanque() {
    storage.ref().child(`épreuves/${name}`).delete().then(res => {
      axios.delete(`/banques/${id}`).then(() => {
      handleDeleteBanque(id);
      handleClose();
    });
    })
  }

  return (
    <>
      {isAdmin ? (
        <Btn tip="Supprimer cette épreuve" onClick={handleOpen}>
          <DeleteOutline fontSize="small" color="secondary" />
        </Btn>
      ) : null}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Etes-vous sûr de vouloir supprimer cette épreuve?
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Non
          </Button>
          <Button color="secondary" onClick={deleteBanque}>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteBanque.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  handleDeleteBanque: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isAdmin: state.user.user && state.user.user.role === "admin"
});

export default connect(mapStateToProps)(DeleteBanque);
