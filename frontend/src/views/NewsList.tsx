import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Banner from '../components/Banner';
import Filters from '../components/Filters';
import { resolveQueryUrl } from '../helpers/resolveQueryUrl';
import Articles from '../components/Articles';

const NewsList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [state, setState] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const { data, isLoading } = useQuery({
        queryKey: ['news', { state, topic, searchKeyword, page }],
        queryFn: async () => {
            const response = await fetch(
                resolveQueryUrl({
                    state,
                    topic,
                    searchKeyword,
                    page,
                    pageSize: 8,
                })
            );
            return response.json();
        },
    });

    const navigateToPage = (newPage: number) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', String(newPage));
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageParam = queryParams.get('page');
        if (pageParam) {
            setPage(Number(pageParam));
        }
    }, [location.search]);

    return (
        <Box>
            <Box className="newsBg">
                <Banner />
            </Box>
            <Filters
                state={state}
                setState={setState}
                topic={topic}
                setTopic={setTopic}
                setSearchKeyword={setSearchKeyword}
                navigateToPage={navigateToPage}
            />
            <Articles data={data?.rows} isLoading={isLoading} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: '5rem',
                }}
            >
                <Pagination
                    count={data?.totalPages ?? 10}
                    page={page}
                    onChange={(_event: ChangeEvent<unknown>, newPage: number) =>
                        navigateToPage(newPage)
                    }
                    size="large"
                    shape="rounded"
                    variant="outlined"
                />
            </Box>
        </Box>
    );
};

export default NewsList;
