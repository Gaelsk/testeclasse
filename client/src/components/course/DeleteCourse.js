import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Btn from "../layout/Btn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//redux
import { connect } from "react-redux";
import { deleteCourse } from "../../redux/actions/course";

const styles = {
  deleteBtn: {
    /*position: "absolute",
    top: 0,
    right: "2%"*/
  }
};

function DeleteCourse({ deleteCourse, id, url, classes, isAdmin }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleDeleteComment() {
    deleteCourse(id, url);
    handleClose();
  }

  return (
    <>
      {isAdmin ? (
        <>
          <Btn
            btnClassName={classes.deleteBtn}
            tip="Supprimer ce cours"
            onClick={handleOpen}
          >
            <DeleteOutline fontSize="small" color="secondary" />
          </Btn>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
              Etes-vous sûr de vouloir supprimer ce cours?
            </DialogTitle>
            <DialogActions>
              <Button color="primary" onClick={handleClose}>
                Non
              </Button>
              <Button color="secondary" onClick={handleDeleteComment}>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </>
  );
}

const mapDispatchToProps = {
  deleteCourse
};
const mapStateToProps = state => ({
  isAdmin: state.user.user && state.user.user.role === "admin"
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeleteCourse));
