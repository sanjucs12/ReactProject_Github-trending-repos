import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, ListGroup } from 'react-bootstrap';
import RepoDetails from './RepoDetails';

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]);
  const [language, setLanguage] = useState('');
  const [date, setDate] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await axios.get('https://api.github.com/repositories', {
          params: {
            language,
            since: date
          }
        });
        setRepos(response.data);
      } catch (error) {
        console.error('Error fetching trending repositories:', error);
      }
    };

    fetchTrendingRepos();
  }, [language, date]);

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };

  const handleRepoClick = repo => {
    setSelectedRepo(repo);
  };

  return (
    <div>
      <h1>Trending GitHub Repositories</h1>
      <Form>
        {/* Filter options */}
      </Form>
      <ListGroup>
        {repos.map(repo => (
          <ListGroup.Item key={repo.id} onClick={() => handleRepoClick(repo)}>
            {repo.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedRepo && <RepoDetails repo={selectedRepo} />}
    </div>
  );
};

export default TrendingRepos;
