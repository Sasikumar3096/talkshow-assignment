import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { PostsController } from './controllers/posts.controller';
import { SERVER_PORT } from './config';

const app = express();

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
});

app.use('/api/v1/posts/', limiter);

app.post('/api/v1/posts', PostsController.createPost);
app.get('/api/v1/posts/:id/analysis', PostsController.getAnalysisById);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
