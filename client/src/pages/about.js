import React from "react";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import banner from "../images/3.jpg";
import Layout from "../components/layout/Layout";

const styles = theme => ({
  container: {
    maxWidth: 850,
    margin: "auto",
    padding: 14
  },
  image: {
    width: "85%",
    height: 450,
    borderRadius: 3,
    backgroundColor: "#f1f1f1",
    objectFit: "cover",
    [theme.breakpoints.down(600)]: {
      width: "100%",
      height: "auto"
    }
  },
  textContainer: {
    marginLeft: -140,
    marginTop: 150,
    padding: "13vmin 10vmin",
    backgroundColor: "#fff",
    boxShadow: "0px 1px 18px rgba(0,0,0,0.14)",
    [theme.breakpoints.down(600)]: {
      margin: 0
    },
    "& h5": {
      fontWeight: "600"
    },
    "& p": {
      color: "#444"
    },
    "& .relative": { position: "relative" },
    "& .underliner": {
      position: "absolute",
      bottom: -20,
      left: -10,
      backgroundColor: theme.palette.primary.main,
      height: 4,
      width: 55,
      borderRadius: 4
    }
  }
});

function About({ classes }) {
  return (
    <Layout>
      <div className="bg-white">
        <div className={`mtop ${classes.container}`}>
          <Grid container>
            <Grid item sm={6}>
              <img src={banner} className={classes.image} alt="" />
            </Grid>
            <Grid item sm={6}>
              <div className={classes.textContainer}>
                <Box mb={3} className="relative">
                  <Typography variant="h5">Notre mission</Typography>
                  <hr className="underliner" />
                </Box>
                <Typography>
                  E-classe est une plateforme de e-learning (de cours en ligne)
                  mise en place par la fondation Invest in Life Foundation,
                  résolument engagée avec dans la lutte pour l’éducation des
                  enfants, qui a pour but d’assurer aux apprenants un
                  déroulement correct et sans encombre du calendrier scolaire
                  2020-2021 et suivant.<br/> Cette initiative vise à accompagner le
                  Programme d’Action du Gouvernement (PAG) du président Patrice
                  TALON dans son ambition de faire du Bénin le quartier
                  numérique de l’Afrique.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}
export default withStyles(styles)(About);
