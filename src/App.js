import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Student from "./pages/Student";
import StudentForm from "./pages/StudentForm";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <div className="c c-main">
        <Navbar setAuth={setAuth} auth={auth} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" auth={auth}>
            <Login setAuth={setAuth} auth={auth} />
          </Route>
          <React.Fragment>
            <div className="c-content">
              <PrivateRoute exact path="/home" component={Home} auth={auth} />
              <PrivateRoute
                exact
                path="/student"
                component={Student}
                auth={auth}
              />
              <PrivateRoute
                exact
                path="/student/form"
                component={StudentForm}
                auth={auth}
              />
              <PrivateRoute
                exact
                path="/student/form/:id"
                component={StudentForm}
                auth={auth}
              />
            </div>
          </React.Fragment>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  useEffect(() => {
  }, [])
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
};

function PageNotFound() {
  return <h1>Page Not Found 404</h1>;
}

export default App;
