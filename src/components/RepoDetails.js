import React from "react";
import { Card, Image } from "react-bootstrap";

const RepoDetails = ({ repo }) => {
  return (
    <Card className="my-4 mx-auto p-4" style={{ maxWidth: "400px", backgroundColor: "#f6f8fa" }}>
      <Card.Body>
        <Card.Title>{repo.name}</Card.Title>
        <Image src={repo.avatar} roundedCircle style={{ width: "100px", marginBottom: "1rem" }} />
        <Card.Text>Author: {repo.author}</Card.Text>
        <Card.Text>Language: {repo.language}</Card.Text>
        <Card.Text>Stars: {repo.stars}</Card.Text>
        <Card.Text>Forks: {repo.forks}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RepoDetails;

