import React from "react";

const RepoDetails = ({ repo }) => {
  return (
    <div>
      <h2>{repo.name}</h2>
      <p>Author: {repo.owner.login}</p>
      <p>Language: {repo.language}</p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks_count}</p>
    </div>
  );
};

export default RepoDetails;
