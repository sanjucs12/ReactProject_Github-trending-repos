import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Form, ListGroup } from "react-bootstrap";
import RepoDetails from "./RepoDetails";
import "bootstrap/dist/css/bootstrap.min.css";

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]);
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/repositories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Optionally, you can include query parameters for language and date filters
          // e.g., '?language=javascript&since=weekly'
        });

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

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    console.log(repo);
  };

  return (
    <div>
      <h1 className="text-center mt-4">Trending GitHub Repositories</h1>
      <Form className="my-4 mx-auto" style={{ maxWidth: "300px" }}>
        <Form.Group controlId="languageFilter">
          <Form.Label>Filter by Language:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter language"
            value={language}
            onChange={handleLanguageChange}
          />
        </Form.Group>
        <Form.Group controlId="dateFilter">
          <Form.Label>Filter by Date:</Form.Label>
          <Form.Control type="date" value={date} onChange={handleDateChange} />
        </Form.Group>
      </Form>
      <ListGroup className="mx-auto" style={{ maxWidth: "500px" }}>
        {repos.map((repo) => (
          <ListGroup.Item
            key={repo.id}
            onClick={() => handleRepoClick(repo)}
            action
            active={selectedRepo && selectedRepo.id === repo.id}
          >
            {repo.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedRepo && <RepoDetails repo={selectedRepo} />}
    </div>
  );
};

export default TrendingRepos;
