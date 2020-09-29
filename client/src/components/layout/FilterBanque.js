import React, { useState, useEffect } from "react";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
const styles = theme => ({
  filter: {
    marginBottom: 14,
    [theme.breakpoints.down(600)]: {
      marginTop: 8
    },
    "& .mt-sm": {
      [theme.breakpoints.down(600)]: {
        marginBottom: 0
      }
    },
    "& .searchBtn": {
      [theme.breakpoints.up(600)]: {
        marginTop: 30
      },
      [theme.breakpoints.down(600)]: {
        marginTop: -12
      }
    },
    "& .category-filter": {
      [theme.breakpoints.down(600)]: {
        marginTop: -12
      }
    }
  },
  input: {
    backgroundColor: "#fff",
    padding: "2px 12px",
    border: "1px solid #ddd",
    width: "100%",
    marginTop: 6
  },
  option: {
    paddingLeft: 14,
    padding: 8
  }
});

function BanqueFilter({ classes, onParamsChange }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Toutes");
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState("Toutes");

  useEffect(() => {
    //get categories
    axios.get("/categories").then(res => {
      setCategories([{ name: "Toutes", _id: "Toutes" }, ...res.data]);
    });
    //get levels
    axios.get("/levels").then(res => {
      setLevels([{ name: "Toutes", _id: "Toutes" }, ...res.data]);
    });
  }, []);

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  function handleLevelChange(e) {
    setLevel(e.target.value);
  }
  function searchBanque() {
    const params = {};
    if (category.length && category !== "Toutes") params.category = category;
    if (level.length && level !== "Toutes") params.level = level;
    onParamsChange(params);
  }
  return (
    <Grid
      container
      alignItems="center"
      //justify="space-between"
      className={classes.filter}
      spacing={2}
    >
      <Grid item sm={3} xs={12}>
        <Box className="category-filter">
          <Typography>Matière</Typography>
          <Select
            value={category}
            name="categories"
            onChange={handleCategoryChange}
            fullWidth
            className={classes.input}
            placeholder="Choisir une matière"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat._id} className={classes.option}>
                {cat.name}
              </option>
            ))}
          </Select>
        </Box>
      </Grid>
      <Grid item sm={3} xs={12}>
        <Box className="category-filter">
          <Typography>Classe</Typography>
          <Select
            value={level}
            name="levels"
            onChange={handleLevelChange}
            fullWidth
            className={classes.input}
            placeholder="Choisir un niveau"
          >
            {levels.map((level, i) => (
              <option key={i} value={level._id} className={classes.option}>
                {level.name}
              </option>
            ))}
          </Select>
        </Box>
      </Grid>
      <Grid item sm={2} xs={12}>
        <Button
          onClick={searchBanque}
          className="searchBtn"
          variant="contained"
          color="primary"
        >
          Rechercher
        </Button>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(BanqueFilter);
