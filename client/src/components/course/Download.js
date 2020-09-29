import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Btn from "../layout/Btn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Axios from "axios";
import DownloadIcon from "@material-ui/icons/CloudDownload";
//redux
import { connect } from "react-redux";
import { downloadCourse } from "../../redux/actions/course";

function Download({ user, uri, title, courseId, downloadCourse, btn }) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleDownloadFile() {
    if (user) {
      var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', uri);
  xhr.send();
        if (courseId) downloadCourse(courseId);
    } else {
      handleOpen();
    }
  }
  return (
    <>
      {!btn ? (
        <Btn tip="Télécharger" onClick={handleDownloadFile}>
          <DownloadIcon />
        </Btn>
      ) : (
        <Button variant="contained" color="primary" onClick={handleDownloadFile}>
          Télécharger
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className="dialog"
      >
        <DialogTitle>Veuillez vous connecter</DialogTitle>
        <DialogContent>
          <Button
            component={Link}
            to="/connexion"
            className="mr-6"
            variant="contained"
          >
            Se connecter
          </Button>
          <Button component={Link} to="/inscription">
            S'inscrire
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

Download.propTypes = {
  user: PropTypes.object,
  uri: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user
});
const mapDispatchToProps = {
  downloadCourse
};
export default connect(mapStateToProps, mapDispatchToProps)(Download);
