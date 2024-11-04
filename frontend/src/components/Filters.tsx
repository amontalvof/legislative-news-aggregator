import { Dispatch, SetStateAction, useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import Title from './Title';
import { categoryList, statesList } from '../constants/data';
import DebounceInput from './DebounceInput';

type FiltersProps = {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
    topic: string;
    setTopic: Dispatch<SetStateAction<string>>;
    setSearchKeyword: Dispatch<SetStateAction<string>>;
    navigateToPage: (newPage: number) => void;
};

const Filters = ({
    state,
    setState,
    topic,
    setTopic,
    setSearchKeyword,
    navigateToPage,
}: FiltersProps) => {
    const [openState, setOpenState] = useState(false);
    const [openTopic, setOpenTopic] = useState(false);

    const handleSelectorChange = (
        event: SelectChangeEvent,
        selector: string
    ) => {
        if (selector === 'state') {
            setState(event.target.value);
        }
        if (selector === 'topic') {
            setTopic(event.target.value);
        }
        navigateToPage(1);
    };

    const handleClose = (selector: string) => {
        if (selector === 'state') {
            setOpenState(false);
        }
        if (selector === 'topic') {
            setOpenTopic(false);
        }
    };

    const handleOpen = (selector: string) => {
        if (selector === 'state') {
            setOpenState(true);
        }
        if (selector === 'topic') {
            setOpenTopic(true);
        }
    };

    return (
        <Box component="section" className="filter-container">
            <Title title="search news" />
            <form className="filter-form">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="state-select-label">State</InputLabel>
                    <Select
                        labelId="state-select-label"
                        open={openState}
                        onClose={() => handleClose('state')}
                        onOpen={() => handleOpen('state')}
                        value={state}
                        label="State"
                        onChange={(event) =>
                            handleSelectorChange(event, 'state')
                        }
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {statesList.map((item: string) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="state-select-label">Topic</InputLabel>
                    <Select
                        labelId="state-select-label"
                        open={openTopic}
                        onClose={() => handleClose('topic')}
                        onOpen={() => handleOpen('topic')}
                        value={topic}
                        label="Topic"
                        onChange={(event) =>
                            handleSelectorChange(event, 'topic')
                        }
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {categoryList.map((item: string) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <DebounceInput
                        debounceTimeout={750}
                        handleDebounce={setSearchKeyword}
                        navigateToPage={navigateToPage}
                    />
                </FormControl>
            </form>
        </Box>
    );
};

export default Filters;