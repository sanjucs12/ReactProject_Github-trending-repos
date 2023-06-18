import "./App.css";
import TrendingRepos from "./components/TrendingRepos";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/trending" component={TrendingRepos} />
      </Switch>
    </Router>
  );
}

export default App;
