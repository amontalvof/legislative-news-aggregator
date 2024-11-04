export const resolveQueryUrl = ({
    state,
    topic,
    searchKeyword,
    page = 1,
    pageSize = 10,
}: {
    state: string;
    topic: string;
    searchKeyword: string;
    page?: number;
    pageSize?: number;
}) => {
    let url = `http://localhost:8080/news?page=${page}&pageSize=${pageSize}`;
    if (state) {
        url += `&state=${state}`;
    }
    if (topic) {
        url += `&category=${topic}`;
    }
    if (searchKeyword) {
        url += `&search=${searchKeyword}`;
    }
    return url;
};
