import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogContent } from "@material-ui/core";

const styles = () => ({
  videoModal: {}
});

function DeleteCourse({ classes, video, courseTitle }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        Lire
      </Button>
      <Dialog
        className={classes.videoModal}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{courseTitle}</DialogTitle>
        <DialogContent>
          <video src={video} autoPlay={open} width="100%" height="320" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(DeleteCourse);
