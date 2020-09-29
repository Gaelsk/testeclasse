import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import WhatsappIcon from "@material-ui/icons/WhatsApp"
import MailIcon from "@material-ui/icons/Mail"

const styles = theme => ({
  footer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: 20,
    padding: 24,
    borderTop: "1px solid #eee",
    [theme.breakpoints.down(600)]: {
        gridTemplateColumns: "1fr",
      }
  }
});

function Layout({ children, classes, bgLight }) {
  return (
    <>
      <NavBar />
      <main style={{ backgroundColor: bgLight ? "#f4f4f4" : "#fff" }}>
        {children}
      </main>
      <Box mt={5}>
        <footer  className={`bg-white container ${classes.footer}`}>
            <div>
              <Typography component={Link} to="/a-propos">
                A propos
              </Typography><br/>
              <Typography component={Link} to="/cours">
                Nos cours
              </Typography>
            </div>

            <Typography>© E-classe 2020. Tous droits réservés.</Typography>
            <div>
            <div className="d-flex">
            <WhatsappIcon style={{marginRight: 4}} />
            <Typography component={Link} to="https://wa.me/22960353533">+229 60353533</Typography>
            </div>
            <div className="d-flex">
            <MailIcon style={{marginRight: 4}} />
            <Typography component={Link} to="mailto:eclasse.ilf@gmail.com">eclasse.ilf@gmail.com</Typography>
            </div>
            </div>
        </footer>
      </Box>
    </>
  );
}

export default withStyles(styles)(Layout);
