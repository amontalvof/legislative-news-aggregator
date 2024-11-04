import { Request, Response } from 'express';
import { fetchLegislationNews } from '../seed/script';
import { connect } from '../database/connection';

export const populateArticles = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { from, to, pageSize, token } = body;
        if (process.env.TOKEN !== token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const articles = await fetchLegislationNews({ from, to, pageSize });
        const query = `
        INSERT INTO articles (author, title, description, url, urlToImage, content, state, sourceName, publishedAt, category, articleId)
        VALUES ?
        ON DUPLICATE KEY UPDATE
            author = VALUES(author),
            title = VALUES(title),
            description = VALUES(description),
            url = VALUES(url),
            urlToImage = VALUES(urlToImage),
            content = VALUES(content),
            state = VALUES(state),
            sourceName = VALUES(sourceName),
            publishedAt = VALUES(publishedAt),
            category = VALUES(category)
        `;

        const connection = await connect();
        await connection.query(query, [articles]);
        await connection.end();
        return res.json({ articles });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
