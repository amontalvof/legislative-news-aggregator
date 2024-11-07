import { Box, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Empty from '../assets/empty.jpg';

const NewsDetails = () => {
    const location = useLocation();
    const { article } = location.state || {};
    const {
        author,
        title,
        url,
        urlToImage,
        content,
        state,
        sourceName,
        publishedAt,
        category,
    } = article;
    const formattedContent = content?.split('… [')[0];
    return (
        <Box>
            <Box
                sx={{
                    minHeight: '30vh',
                    background: `url('${
                        urlToImage || Empty
                    }') center/cover no-repeat`,
                }}
            />
            <Box component="section" className="single-news-info">
                <Box component="article" className="desc">
                    {title && <Typography component="h3">{title}</Typography>}
                    {formattedContent && (
                        <Typography>{formattedContent}…</Typography>
                    )}
                    {url && (
                        <Link href={url} target="_blank" rel="noreferrer">
                            <Typography>Read the Full Article</Typography>
                        </Link>
                    )}
                </Box>
                <Box component="article" className="info">
                    <Typography component="h3">Info</Typography>
                    {author && (
                        <Typography component="h6">Author: {author}</Typography>
                    )}
                    {category && (
                        <Typography component="h6">
                            Topic: {category}
                        </Typography>
                    )}
                    {state && (
                        <Typography component="h6">State: {state}</Typography>
                    )}
                    {sourceName && (
                        <Typography component="h6">
                            Source: {sourceName}
                        </Typography>
                    )}
                    {publishedAt && (
                        <Typography component="h6">
                            Published At:{' '}
                            {new Date(publishedAt).toLocaleString()}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default NewsDetails;
