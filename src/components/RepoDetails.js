import React from "react";
import "./RepoDetails.css";
import { Card, Image } from "react-bootstrap";

const RepoDetails = ({ repo, darkMode }) => {
  return (
    <Card
      className={`my-4 mx-auto p-4 ${
        darkMode ? "dark-mode" : ""
      } repo-details-container`}
      style={{ maxWidth: "400px" }}
    >
      <Card.Body>
        <Card.Title className="repo-title">{repo.name}</Card.Title>
        <Image
          src={repo.avatar}
          roundedCircle
          style={{ width: "100px", marginBottom: "1rem" }}
        />
        <Card.Text>Author: {repo.author}</Card.Text>
        <Card.Text>Language: {repo.language}</Card.Text>
        <Card.Text>Stars: {repo.stars}</Card.Text>
        <Card.Text>Forks: {repo.forks}</Card.Text>
        <a href={repo.url} className="repo-link">
          Go to repository
        </a>
      </Card.Body>
    </Card>
  );
};

export default RepoDetails;
