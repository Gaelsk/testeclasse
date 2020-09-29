import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Btn from "../layout/Btn";
//icons
import ListIcon from "@material-ui/icons/ListAlt";
import CategoriesIcon from "@material-ui/icons/List";
import BanqueIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";
import LogoutIcon from "@material-ui/icons/ArrowForward";
import AdIcon from "@material-ui/icons/Adb"

import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/user";

function MenuItems({ logoutUser }) {
  const active = url => {
    return window.location.pathname === `/admin/${url}` ? "active-btn" : null;
  };
  function handleLogoutUser() {
    logoutUser();
    window.history.pushState(null, null, "/");
  }
  return (
    <div className="menu-items">
      <Link className={active("cours")} to="/admin/cours">
        <ListItem className="d-flex">
          <ListItemIcon className="list-icon">
            <Btn tip="Cours">
              <ListIcon />
            </Btn>
          </ListItemIcon>
          <ListItemText className="list-text" primary="Cours" />
        </ListItem>
      </Link>
      <Link className={active("categories")} to="/admin/categories">
        <ListItem className="d-flex">
          <ListItemIcon className="list-icon">
            <Btn tip="Matières et Niveaux">
              <CategoriesIcon />
            </Btn>
          </ListItemIcon>
          <ListItemText className="list-text" primary="Matières / Niveaux" />
        </ListItem>
      </Link>
      <Link className={active("banque")} to="/admin/banque">
        <ListItem className="d-flex">
          <ListItemIcon className="list-icon">
            <Btn tip="Banque">
              <BanqueIcon />
            </Btn>
          </ListItemIcon>
          <ListItemText className="list-text" primary="Banque" />
        </ListItem>
      </Link>
      <Link className={active("utilisateurs")} to="/admin/utilisateurs">
        <ListItem className="d-flex">
          <ListItemIcon className="list-icon">
            {/*<ListIcon />*/}
            <Btn tip="Utilisateurs">
              <PeopleIcon />
            </Btn>
          </ListItemIcon>
          <ListItemText className="list-text" primary="Utilisateurs" />
        </ListItem>
      </Link>
      <Link className={active("publicités")} to="/admin/publicités">
        <ListItem className="d-flex">
          <ListItemIcon className="list-icon">
            {/*<ListIcon />*/}
            <Btn tip="Publicités">
              <AdIcon />
            </Btn>
          </ListItemIcon>
          <ListItemText className="list-text" primary="Publicités" />
        </ListItem>
      </Link>

      <ListItem className="d-flex">
        <ListItemIcon className="list-icon">
          <Btn onClick={handleLogoutUser} tip="Se déconnecter">
            <LogoutIcon color="error" />
          </Btn>
        </ListItemIcon>
        <ListItemText className="list-text" primary="Se déconnecter" />
      </ListItem>
    </div>
  );
}

MenuItems.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logoutUser
};
export default connect(null, mapDispatchToProps)(MenuItems);
