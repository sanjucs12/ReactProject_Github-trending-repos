import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TrendingRepos from "./TrendingRepos";
import RepoDetails from "./RepoDetails";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TrendingRepos} />
        <Route exact path="/repos/:id" component={RepoDetails} /> {/* Specify the dynamic parameter ":id" in the path */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
