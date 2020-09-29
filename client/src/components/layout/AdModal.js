import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
//core
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Axios from "axios";
import getCoverImage from "../../utils/getCoverImage";
import Btn from "../utils/Btn";

const styles = theme => ({
  dialog: {
    position: "relative",
    "& .closeIcon": {
      top: 0,
      right: 0
    }
  },
  dialogContent: {
    marginTop: 6
  },
  adImg: {
    height: 230,
    width: "100%",
    objectFit: "cover"
  }
});

function AdModal({ classes, isOpen, closeModal }) {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    Axios.get("/ad").then(res => {
      setAd(res.data);
    });
  }, []);

  return (
    <>
      {ad && (
        <Dialog
          open={isOpen}
          onClose={closeModal}
          fullWidth
          maxWidth="sm"
          className={`dialog ${classes.dialog}`}
        >
          <div className="closeIcon" style={{ position: "absolute" }}>
            <Btn btnClassName="closeIcon" tip="Fermer" onClick={closeModal}>
              <CloseIcon />
            </Btn>
          </div>
          <DialogTitle>{ad.title}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={2}>
              {ad.img && (
                <Grid item style={{ width: "100%" }}>
                  <img
                    src={getCoverImage(ad.img)}
                    className={classes.adImg}
                    alt=""
                  />
                </Grid>
              )}
              <Grid item>{ad.content}</Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

AdModal.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AdModal);
