import React, { useEffect, useState } from "react";
import { Form, ListGroup, Container, Button } from "react-bootstrap";
import RepoDetails from "./RepoDetails"; ///111
import "bootstrap/dist/css/bootstrap.min.css";
import "./TrendingRepos.css";

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [selectedRepoId, setSelectedRepoId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await fetch(
          "https://api.gitterapp.com/repositories?language=javascript&since=weekly",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        } else {
          console.error(
            "Error fetching trending repositories:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching trending repositories:", error);
      }
    };

    fetchTrendingRepos();
  }, []);

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleRepoClick = (repoId) => {
    setSelectedRepoId(repoId);
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <Container
      fluid
      className={
        darkMode
          ? "trending-repos-container dark-mode"
          : "trending-repos-container"
      }
    >
      <Button
        onClick={toggleDarkMode}
        className="position-fixed top-0 end-0 mt-3 me-3"
      >
        Toggle Dark Mode
      </Button>
      <h1 className="text-center mt-4">Trending GitHub Repositories</h1>

      <Form className="my-4 mx-auto" style={{ maxWidth: "300px" }}>
        <Form.Group controlId="nameFilter">
          <Form.Label>Filter by Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Repository"
            value={filterName}
            onChange={handleFilterNameChange}
          />
        </Form.Group>
      </Form>
      <ListGroup className="mx-auto" style={{ maxWidth: "500px" }}>
        {filteredRepos.map((repo, index) => (
          <React.Fragment key={index}>
            <ListGroup.Item
              onClick={() => handleRepoClick(index)}
              action
              active={selectedRepoId === index}
              //   className="repo-list-item"
              className={
                darkMode ? "repo-list-item dark-mode" : "repo-list-item"
              }
            >
              {repo.name}
            </ListGroup.Item>
            {selectedRepoId === index && (
              //   <ListGroup.Item className="repo-details-item">
              <ListGroup.Item
                className={
                  darkMode ? "repo-details-item dark-mode" : "repo-details-item"
                }
                style={{ maxWidth: "500px" }}
              >
                <RepoDetails repo={repo} darkMode={darkMode} />
              </ListGroup.Item>
            )}
          </React.Fragment>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TrendingRepos;
