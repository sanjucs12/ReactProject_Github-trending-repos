import React, { useEffect, useState } from "react";
import axios from "axios";

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await axios.get("https://api.github.com/repositories");
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching trending repositories:", error);
      }
    };

    fetchTrendingRepos();
  }, []);

  return (
    <div>
      <h1>Trending GitHub Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <h3>{repo.name}</h3>
            <p>Author: {repo.owner.login}</p>
            <p>Language: {repo.language}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingRepos;
