import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

export const app = express();
dotenv.config();

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

app.get(`/users`, async (req, res) => {
  const number = req.query.since || 0;
  const url = `https://api.github.com/users?since=${number}`;

  try {
    const response = await axios.get(url, axiosConfig);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      axiosConfig,
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).send('User not found');
  }
});

app.get('/users/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      axiosConfig,
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).send('User not found');
  }
});
