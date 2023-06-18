import React, { useEffect, useState } from "react";
import { Form, ListGroup, Container } from "react-bootstrap";
import RepoDetails from "./RepoDetails";
import "bootstrap/dist/css/bootstrap.min.css";

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [selectedRepoId, setSelectedRepoId] = useState(null);

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
    <Container>
      <h1 className="text-center mt-4">Trending GitHub Repositories</h1>
      <Form className="my-4 mx-auto" style={{ maxWidth: "300px" }}>
        <Form.Group controlId="nameFilter">
          <Form.Label>Filter by Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
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
            >
              {repo.name}
            </ListGroup.Item>
            {selectedRepoId === index && (
              <ListGroup.Item>
                <RepoDetails repo={repo} />
              </ListGroup.Item>
            )}
          </React.Fragment>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TrendingRepos;
