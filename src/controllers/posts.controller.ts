import { Request, Response } from 'express';
import { PostService } from '../service/post.server';
import { redisClient } from '../db/redis';

export class PostsController {
    static async createPost (req: Request, res: Response) {
        const {id, text} = req.body;
        try {
            await PostService.createPost(id, text);
        } catch (error: any) {
            if((error)?.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Posts with the same id already present' });
            } else {
                return res.status(500).json({ message: 'Something went wrong!' });
            }
        }
        return res.status(201).json({ message: 'Post created successfully' });
    }

    static async getAnalysisById(req: Request, res: Response) {
        const { id } = req.params;

        const cachedPost = await redisClient.get(`post:${id}`);
        if (cachedPost) {
            return JSON.parse(cachedPost);
        }

        const post = await PostService.getPostById(Number(id));

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const { text } = post;
        const words = text.split(/\s+/);
        const totalNumberOfWords = words.length;
        const totalWordLength = words.reduce((total, word) => total + word.length, 0);
        const avgWordLength = totalWordLength / totalNumberOfWords || 0;
        const resp = { totalNumberOfWords, avgWordLength, text };
        await redisClient.setex(`post:${id}`, 120, JSON.stringify(resp));

        res.status(200).json(resp);
    }
}
