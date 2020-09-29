import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//redux
import { connect } from "react-redux";
import { signup } from "../redux/actions/user";
import axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    //backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .logo": {
      height: 20
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  progress: {
    position: "absolute",
    color: theme.palette.primary.main
  },
  option: {
    paddingLeft: 14,
    padding: 8,
    "&:hover": {
      backgroundColor: "#f1f1f1"
    }
  }
}));

function SignUpSide({ signup, history, loading, error }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState(null);

  useEffect(() => {
    axios.get("/levels").then(res => {
      setLevels(res.data);
    });
  }, []);
  function handleLevelChange(e) {
    setLevel(e.target.value);
  }
  function register(ev) {
    ev.preventDefault();
    const data = {
      username,
      email,
      password,
      level
    };
    signup(data, history);
    //setLoading(false);
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={`${classes.image} loginBg`}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={require("../images/logo.jpg")} alt="" className="logo" />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <form className={classes.form} noValidate onSubmit={register}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nom complet"
              name="name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              error={error && error.username ? true : false}
              helperText={error && error.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Addresse Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={error && error.email ? true : false}
              helperText={error && error.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={error && error.password ? true : false}
              helperText={error && error.password}
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
              {error && error.level && (
                <Typography variant="caption" color="error">
                  {error.level}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              S'inscrire
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/connexion" variant="body2">
                  {"Déjà inscrit? Se connecter"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = {
  signup
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpSide);
