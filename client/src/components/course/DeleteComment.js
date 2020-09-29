import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Btn from "../layout/Btn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//redux
import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/course";

const styles = {
  deleteBtn: {
    position: "absolute",
    top: 0,
    right: "2%"
  }
};

class DeletePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  _handleDeleteComment = () => {
    this.props.deleteComment(this.props.id);
    this.handleClose();
  };
  render() {
    const { classes, username, authUsername } = this.props;
    return (
      <>
        {username === authUsername ? (
          <Btn
            btnClassName={classes.deleteBtn}
            tip="Supprimer le commentaire"
            onClick={this.handleOpen}
          >
            <DeleteOutline fontSize="small" color="secondary" />
          </Btn>
        ) : null}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Etes-vous sûr de vouloir supprimer ce commentaire?
          </DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Non
            </Button>
            <Button color="secondary" onClick={this._handleDeleteComment}>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapDispatchToProps = {
  deleteComment
};
const mapStateToProps = state => ({
  authUsername: state.user.user && state.user.user.username
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeletePost));
