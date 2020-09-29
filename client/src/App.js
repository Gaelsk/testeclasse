import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import axios from "axios";
//components
import ScrollToTop from "./ScrollToTop";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import profile from "./pages/profile";
import course from "./pages/course";
import courses from "./pages/courses";
import banque from "./pages/banque";
import about from "./pages/about";
import contact from "./pages/contact";

//admin
import admin from "./pages/admin/main";
import users from "./pages/admin/users";
import banques from "./pages/admin/banques";
import Categories from "./pages/admin/categories";
import ads from "./pages/admin/ads";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthRoute from "./utils/AuthRoute";
import AdminRoute from "./utils/AdminRoute";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003f88"
      //main: "#4A675A"
    },
    secondary: {
      main: "#c2185b"
    }
  }
});

const token = localStorage.JwtToken;
if (token) {
  const user = localStorage.user;
  axios.defaults.headers.common["jwt"] = token;
  store.dispatch({
    type: "SET_AUTHENTICATED",
    payload: { user: JSON.parse(user) }
  });
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/cours" component={courses} />
            <Route exact path="/banque" component={banque} />
            <Route exact path="/a-propos" component={about} />
            <Route exact path="/contact" component={contact} />

            <AuthRoute exact path="/profile" component={profile} />
            <AuthRoute exact path="/cours/:id" component={course} />
            <Route exact path="/inscription" component={signup} />
            <Route exact path="/connexion" component={login} />
            <AdminRoute exact path="/admin/cours" component={admin} />
            <AdminRoute exact path="/admin/categories" component={Categories} />
            <AdminRoute exact path="/admin/banque" component={banques} />
            <AdminRoute exact path="/admin/utilisateurs" component={users} />
            <AdminRoute exact path="/admin/publicités" component={ads} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
