import React from "react";
import { useHistory, Link } from "react-router-dom";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
//icons
import UserIcon from "@material-ui/icons/Person";
import MailIcon from "@material-ui/icons/Mail";
import CalendarToday from "@material-ui/icons/CalendarToday";

import Layout from "../components/layout/Layout";
import moment from "moment";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/user";
import Avatar from "../components/layout/Avatar";
//import EditUserDetails from "../components/user/EditUserDetails";

const styles = () => ({
  userCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    margin: "20px auto",
    padding: "12px 16px",
    textAlign: "center",
    "& h4": {
      textAlign: "center"
    },
    "& button": {
      marginTop: 14
    },
    "& .d-flex": {
      marginTop: 8
    }
  }
});

function Profile({ classes, logoutUser, user }) {
  const history = useHistory();
  function logout() {
    logoutUser();
    history.push("/");
  }
  return (
    <Layout>
      <div className="mtop container">
        <Paper className={classes.userCard}>
          {Object.keys(user).length > 0 ? (
            <>
              <Typography variant="h4">Mon Compte</Typography>
              <Avatar name={user.username} size={70} />
              <div className="d-flex align-items-center">
                <UserIcon fontSize="small" color="primary" />
                <Box ml={2}>
                  <Typography variant="h6" color="primary">
                    {user.username}
                  </Typography>
                </Box>
              </div>
              <div className="d-flex align-items-center">
                <MailIcon fontSize="small" color="primary" />
                <Box ml={2}>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </Box>
              </div>
              <div className="d-flex align-items-center">
                <Box ml={2}>
                  <Typography>{user.level && user.level.name}</Typography>
                </Box>
              </div>
              <div className="d-flex align-items-center">
                <CalendarToday fontSize="small" color="primary" />
                <Box ml={2}>
                  <Typography variant="body2">
                    Inscrit(e) le{" "}
                    {moment(user.createdAt).format("DD, MMMM YYYY")}
                  </Typography>
                </Box>
              </div>
              {/*<EditUserDetails user={user} />*/}
              <Button color="secondary" variant="contained" onClick={logout}>
                Se déconnecter
              </Button>
            </>
          ) : (
            <Button component={Link} to="/connexion">
              Se connecter
            </Button>
          )}
        </Paper>
      </div>
    </Layout>
  );
}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
