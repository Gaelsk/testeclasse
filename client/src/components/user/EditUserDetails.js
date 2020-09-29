import React, { useState, useEffect } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

//icons
import EditIcon from "@material-ui/icons/Edit";

import axios from "axios";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/user";
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
  plusIcon: {
    position: "absolute",
    top: 10,
    right: 10
  },
  submitBtn: {
    marginRight: 14,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  }
});

function AddCategory({ classes, user }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState([]);
console.log(user)
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) {
      axios.get("/levels").then(res => {
        setLevels(res.data);
      });
    }
  }, [open]);
  function handleLevelChange(e) {
    setLevel(e.target.value);
  }
  function openModal() {
    setOpen(true);
    setName(user.username || "");
    setLevel(user.level.name || "");
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <Btn onClick={openModal} tip="Modifier">
        <EditIcon />
      </Btn>
      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        className="dialog"
      >
        <DialogTitle>Modifier vos informations</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <form>
            <TextField
              type="text"
              className={classes.textField}
              name="name"
              label="Nom complet"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nom et Prénoms"
              fullWidth
            />
            <Box mt={3}>
              <InputLabel id="classe">Classe</InputLabel>
              <Select
                labelId="classe"
                value={level}
                name="categories"
                onChange={handleLevelChange}
                fullWidth
                placeholder="Sélectionner votre classe"
                native
              >
                {levels.map((level, i) => (
                  <option key={i} value={level._id} className={classes.option}>
                    {level.name}
                  </option>
                ))}
              </Select>
            </Box>
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
              Modifier
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
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  editUserDetails
};
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(AddCategory));
