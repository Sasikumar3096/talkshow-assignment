import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sqlite';


class Post extends Model {
    id: number;
    text: string;
}

Post.init(
    {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
        },
            text: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        modelName: 'post',
        tableName: 'posts',
        timestamps: true,
    }
);

Post.sync();

export { Post };
