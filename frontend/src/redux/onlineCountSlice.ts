import {createSlice} from '@reduxjs/toolkit';

export type OnlineCount = {
    total: number;
    pageView: SinglePageView[];
};

export type SinglePageView = {
    name: string;
    count: number;
}

const onlineCountSlice = createSlice({
    name: 'onlineCount',
    initialState: {
        total: 0,
        pageView: []
    } as OnlineCount,
    reducers: {
        updateOnlineCount: (state, {payload}) => {
            state.total = payload;
        },
        updatePageView: (state, {payload}) => {
            const {name, count} = payload;
            if (count === 0) {
                state.pageView = state.pageView.filter(pv => pv.name !== name);
            } else {
                const pageIndex = state.pageView.findIndex(pv => pv.name === name);
                if (pageIndex !== -1) {
                    state.pageView[pageIndex].count = count;
                } else {
                    state.pageView.push({name, count});
                }
            }
        },
        initPageView: (state, {payload}) => {
            state.pageView = payload;
        }
    },
});

export const {updateOnlineCount, updatePageView, initPageView} = onlineCountSlice.actions;
export default onlineCountSlice.reducer;
