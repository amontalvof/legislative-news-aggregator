import { Request, Response } from 'express';
import { connect } from '../database/connection';

export const retrieveArticles = async (req: Request, res: Response) => {
    const { state, category, search, page = 1, pageSize = 10 } = req.query;

    try {
        let baseQuery = `FROM articles`;
        let filters = [];
        let queryParams: any[] = [];

        if (state) {
            filters.push(`state = ?`);
            queryParams.push(state);
        }
        if (category) {
            filters.push(`category = ?`);
            queryParams.push(category);
        }
        if (search) {
            filters.push(
                `MATCH(title, description) AGAINST(? IN NATURAL LANGUAGE MODE)`
            );
            queryParams.push(search);
        }

        const whereClause =
            filters.length > 0 ? `WHERE ` + filters.join(' AND ') : '';

        const countQuery = `SELECT COUNT(*) as total ${baseQuery} ${whereClause}`;

        const dataQuery = `SELECT * ${baseQuery} ${whereClause} ORDER BY publishedAt DESC LIMIT ? OFFSET ?`;
        queryParams.push(
            parseInt(pageSize as string),
            (parseInt(page as string) - 1) * parseInt(pageSize as string)
        );

        const connection = await connect();
        const [countRows] = await connection.query(countQuery, queryParams);
        const totalCount = (countRows as any)[0].total;
        const [dataRows] = await connection.query(dataQuery, queryParams);
        await connection.end();

        res.json({
            totalCount,
            page: parseInt(page as string),
            pageSize: parseInt(pageSize as string),
            totalPages: Math.ceil(totalCount / parseInt(pageSize as string)),
            rows: dataRows,
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
            message: 'An error occurred while fetching news articles.',
        });
    }
};
