import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Skeleton,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Empty from '../assets/empty.jpg';

const Articles = ({
    data,
    isLoading,
}: {
    data: {
        id: number;
        author: string;
        title: string;
        description: string;
        url: string;
        urlToImage: string;
        content: string;
        state: string;
        sourceName: string;
        publishedAt: Date;
        category: string;
        articleId: string;
    }[];
    isLoading: boolean;
}) => {
    const navigate = useNavigate();
    return (
        <Box component="section" className="news-list">
            <Box className="news-list-center">
                {!isLoading &&
                    data.map((article) => {
                        const {
                            id,
                            title,
                            description,
                            urlToImage,
                            state,
                            publishedAt,
                            category,
                        } = article;

                        return (
                            <Card
                                sx={{
                                    maxWidth: 345,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                                key={id}
                            >
                                {!isLoading ? (
                                    <>
                                        <CardContent>
                                            <CardMedia
                                                component="img"
                                                alt={title}
                                                height="140"
                                                image={urlToImage ?? Empty}
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {description}
                                            </Typography>
                                            <br />
                                            {!!state && (
                                                <Typography>
                                                    State: {state}
                                                </Typography>
                                            )}
                                            {!!category && (
                                                <Typography>
                                                    Topic: {category}
                                                </Typography>
                                            )}
                                            {!!publishedAt && (
                                                <Typography>
                                                    Published At:{' '}
                                                    {new Date(
                                                        publishedAt
                                                    )?.toLocaleString()}
                                                </Typography>
                                            )}
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                onClick={() =>
                                                    navigate(`/article/${id}`, {
                                                        state: { article },
                                                    })
                                                }
                                                size="small"
                                            >
                                                Read More
                                            </Button>
                                        </CardActions>
                                    </>
                                ) : (
                                    <CardContent>
                                        <Skeleton sx={{ height: 240 }} />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                    </CardContent>
                                )}
                            </Card>
                        );
                    })}
            </Box>
        </Box>
    );
};

export default Articles;