import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Alert from "@material-ui/lab/Alert";
import Star from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import Axios from "axios";

const mentions = [
  "Pas intéressant",
  "Peu intéressant",
  "Intéressant",
  "Assez intéressant",
  "Très intéressant"
];
const useStyles = makeStyles(() => ({
  btn: {
    fontSize: 12
  },
  ratingContainer: {
    maxwidth: 80
  },
  star: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8
    }
  }
}));

export default function Rate({ courseId }) {
  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleRateChange(number) {
    setRating(number + 1);
  }
  function rateCourse() {
    Axios.post(`/courses/${courseId}/rate`, { rating }).then(() => {
      setMessage({ type: "success", content: "Note envoyée" });
      setTimeout(() => {
        setMessage(null);
      }, 4000);
      handleClose();
    });
  }
  return (
    <>
      <Button
        className={classes.btn}
        onClick={handleOpen}
        color="primary"
        variant="contained"
      >
        Noter ce cours
      </Button>
      {message && (
        <Box mb={2}>
          <Alert className="alert-message">{message.content}</Alert>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Noter ce cours</DialogTitle>
        <DialogContent>
          <div className={classes.ratingContainer}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                color={i < rating ? "primary" : "disabled"}
                className={classes.star}
                onClick={() => handleRateChange(i)}
                titleAccess={mentions[i]}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button color="primary" onClick={rateCourse}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
