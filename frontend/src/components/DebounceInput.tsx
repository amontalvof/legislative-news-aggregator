import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type DebounceInputProps = {
    handleDebounce: Dispatch<SetStateAction<string>>;
    debounceTimeout: number;
    navigateToPage: (newPage: number) => void;
};

const DebounceInput = (props: DebounceInputProps) => {
    const { handleDebounce, debounceTimeout, navigateToPage } = props;

    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            handleDebounce(event.target.value.toLowerCase());
            navigateToPage(1);
        }, debounceTimeout);
    };

    return (
        <TextField
            label="Search"
            onChange={handleChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default DebounceInput;
