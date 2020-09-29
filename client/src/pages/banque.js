import React, { useState, useEffect } from "react";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

//components
import Filter from "../components/layout/FilterBanque";
import Layout from "../components/layout/Layout";
import Download from "../components/course/Download";
import axios from "axios";
import { Typography, CardMedia } from "@material-ui/core";
const styles = theme => ({
  list_container: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: 20,

    [theme.breakpoints.down(968)]: {
      gridTemplateColumns: "repeat(4, 1fr)"
    },
    [theme.breakpoints.down(728)]: {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
    [theme.breakpoints.down(498)]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    [theme.breakpoints.down(320)]: {
      gridTemplateColumns: "1fr"
    }
  },
  list_item: {
    position: "relative",
    backgroundColor: "#FFF",
    "&:hover": {
      transform: "translateY(-8px)",
      transition: "all 1s"
    },
    //height: 180,
    "& .img": {
      height: 140
    },
    "& .banque-details": {
      padding: "4px 12px",
      backgroundColor: "#fff"
    }
  },
  loading_item: {
    height: 220,
    width: "100%",
    backgroundColor: "#fff"
  },
  downloadIcon: {
    position: "absolute",
    right: 8,
    bottom: 8
  }
});

function Banque({ classes }) {
  const [banque, setBanque] = useState([]);
  const [loading, setLoading] = useState(false);
  function getBanque(params) {
    setLoading(true);
    axios.get("/banques", { params }).then(res => {
      setBanque(res.data);
      setLoading(false);
    });
  }
  useEffect(() => {
    getBanque();
  }, []);
  function handleParamsChange(params) {
    getBanque(params);
  }
  return (
    <Layout bgLight>
      <div className="container ptop">
        <Filter onParamsChange={handleParamsChange} />
        {banque.length > 0 && (
          <Typography style={{ marginBottom: 12 }}>
            {banque.length} épreuve{banque.length > 1 ? "s" : ""}
          </Typography>
        )}
        {!loading && banque.length === 0 && (
          <Typography>
            Aucune épreuve ne correspond à votre recherche pour le moment...
          </Typography>
        )}
        <Grid className={classes.list_container}>
          {!loading &&
            banque.map(({ _id, url, level, category }) => (
              <Card className={classes.list_item} key={_id}>
                <CardMedia
                  className="img"
                  image={require("../images/pdf-img.jpg")}
                />
                <div className="banque-details">
                  <Typography>{category.name}</Typography>
                  <Typography>{level.name}</Typography>
                </div>

                <div className={classes.downloadIcon}>
                  <Download icon uri={url} />
                </div>
              </Card>
            ))}
          {loading &&
            Array.from({ length: 10 }).map((_, i) => (
              <Card className={classes.loading_item} key={i} />
            ))}
        </Grid>
      </div>
    </Layout>
  );
}

export default withStyles(styles)(Banque);
