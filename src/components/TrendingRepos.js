import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]);
  const [language, setLanguage] = useState('');
  const [date, setDate] = useState('');

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

  return (
    <div>
      <h1>Trending GitHub Repositories</h1>
      <Form>
        <Form.Group controlId="languageFilter">
          <Form.Label>Filter by Language:</Form.Label>
          <Form.Control type="text" placeholder="Enter language" value={language} onChange={handleLanguageChange} />
        </Form.Group>
        <Form.Group controlId="dateFilter">
          <Form.Label>Filter by Date:</Form.Label>
          <Form.Control type="date" value={date} onChange={handleDateChange} />
        </Form.Group>
      </Form>
      <ul>
        {repos.map(repo => (
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
