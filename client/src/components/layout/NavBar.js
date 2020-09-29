import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//Mui stuff
import withStyles from "@material-ui/core/styles/withStyles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
//MUI Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
//redux
import { connect } from "react-redux";

//styles
const styles = theme => ({
  appBar: {
    backgroundColor: "#fff" //theme.palette.primary.main,
    //color: "#fff"
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& svg": {
      color: "#111!important"
    }
  },
  brand: { height: 34 },
  nav: {
    "& .nav-item": {
      marginLeft: 36
    },
    "& .active": {
      border: `0 solid ${theme.palette.primary.main}`,
      borderBottomWidth: 4
    }
  },
  drawer: {
    postion: "relative",
    paddingTop: 35,
    minWidth: 280,
    "& .close-icon": {
      position: "absolute",
      right: 8,
      top: 8
    }
  }
});

function Navbar({ classes, user }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  function openDrawer() {
    setOpen(true);
  }
  function closeDrawer() {
    setOpen(false);
  }
  const active = url => (url === window.location.pathname ? true : false);
  return (
    <AppBar color="default" className={classes.appBar}>
      <div>
        <Hidden only={["xs", "sm"]}>
          <div className={`${classes.navBar} container`}>
            <Button
              className={classes.brand}
              color="inherit"
              component={Link}
              to="/"
            >
              <img
                src={require("../../images/logo.jpg")}
                className={classes.brand}
                alt=""
              />
            </Button>

            <nav className={classes.nav}>
            <Button
                className="nav-item"
                color={active("/") ? "default" : "inherit"}
                variant={active("/") ? "contained" : "text"}
                component={Link}
                to="/"
              >
                Accueil
              </Button>
              <Button
                className="nav-item"
                color={active("/cours") ? "default" : "inherit"}
                variant={active("/cours") ? "contained" : "text"}
                component={Link}
                to="/cours"
              >
                Cours
              </Button>
              <Button
                className="nav-item"
                color={active("/banque") ? "default" : "inherit"}
                variant={active("/banque") ? "contained" : "text"}
                component={Link}
                to="/banque"
              >
                épreuves
              </Button>
              <Button
                className="nav-item"
                color={active("/a-propos") ? "default" : "inherit"}
                variant={active("/a-propos") ? "contained" : "text"}
                component={Link}
                to="/a-propos"
              >
                A propos
              </Button>
              {/*<Button
                className="nav-item"
                color={active("/contact") ? "default" : "inherit"}
                variant={active("/contact") ? "contained" : "text"}
                component={Link}
                to="/contact"
              >
                Contactez-nous
              </Button>*/}
            </nav>
            {!user ? (
              <div>
                <Button className="nav-item" component={Link} to="/connexion">
                  Se connecter
                </Button>
                <Button
                  className="nav-item"
                  color="inherit"
                  component={Link}
                  to="/inscription"
                  variant="contained"
                >
                  S'inscrire
                </Button>
              </div>
            ) : (
              <Button
                className="nav-item"
                color="inherit"
                component={Link}
                to={user.role === "admin" ? "/admin/cours" : "/profile"}
              >
                @{user.username}
              </Button>
            )}
          </div>
        </Hidden>
        {/*Small Navbar */}
        <Hidden only={["md", "lg", "xl"]}>
          <div className={`${classes.navBar} smNavBar`}>
            <Button onClick={openDrawer}>
              <MenuIcon />
            </Button>

            <Link to="/">
              <img
                src={require("../../images/logo.jpg")}
                className={classes.brand}
                alt=""
              />
            </Link>

            <Button onClick={() => history.push("/cours")}>
              <SearchIcon />
            </Button>
            <Drawer open={open} onClose={closeDrawer}>
              <div className={classes.drawer}>
                <CloseIcon className="close-icon" onClick={closeDrawer} />
                <Button fullWidth color="inherit" component={Link} to="/">
                  Accueil
                </Button>
                <Button fullWidth color="inherit" component={Link} to="/cours">
                  Cours
                </Button>
                <Button fullWidth color="inherit" component={Link} to="/banque">
                  épreuves
                </Button>
                <Button
                  fullWidth
                  color="inherit"
                  component={Link}
                  to="/a-propos"
                >
                  A propos
                </Button>
                {/*<Button
                  fullWidth
                  color="inherit"
                  component={Link}
                  to="/contact"
                >
                  Contactez-nous
                </Button>*/}
                {!user ? (
                  <>
                    <Button
                      fullWidth
                      color="inherit"
                      component={Link}
                      to="/connexion"
                    >
                      Se connecter
                    </Button>
                    <Button
                      fullWidth
                      color="inherit"
                      component={Link}
                      to="/inscription"
                    >
                      S'inscrire
                    </Button>
                  </>
                ) : (
                  <Button
                    fullWidth
                    color="inherit"
                    component={Link}
                    to={user.role === "admin" ? "/admin/cours" : "/profile"}
                  >
                    @{user.username}
                  </Button>
                )}
              </div>
            </Drawer>
          </div>
        </Hidden>
      </div>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  user: state.user.user
});
export default withStyles(styles)(connect(mapStateToProps)(Navbar));
