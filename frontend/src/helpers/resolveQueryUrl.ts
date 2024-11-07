import { baseApiUrl } from '../constants/data';

export const resolveQueryUrl = ({
    state,
    topic,
    searchKeywords,
    page = 1,
    pageSize = 10,
}: {
    state: string;
    topic: string;
    searchKeywords: string[];
    page?: number;
    pageSize?: number;
}) => {
    let url = `${baseApiUrl}/news?page=${page}&pageSize=${pageSize}`;
    if (state) {
        url += `&state=${state}`;
    }
    if (topic) {
        url += `&category=${topic}`;
    }
    if (searchKeywords.length > 0) {
        const searchQuery = searchKeywords.join(',');
        url += `&search=${searchQuery}`;
    }
    return url;
};
