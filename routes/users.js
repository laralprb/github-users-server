import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const userRouter = express.Router();

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

userRouter.get(``, async (req, res) => {
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

userRouter.get('/:username/details', async (req, res) => {
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

userRouter.get('/:username/repos', async (req, res) => {
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
export { userRouter };
