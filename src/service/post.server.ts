import { Post } from "../model/post.model";

export class PostService {
    static async createPost (id: number, text: string) {
        return await Post.create({ id, text });

    }
    static async getPostById (id: number): Promise<{id: number, text: string}> {
        return await Post.findOne({ where: { id } });
    }
}