import { createSlice } from '@reduxjs/toolkit';

export type OnlineCount = {
  count: number;
};

const onlineCountSlice = createSlice({
  name: 'onlineCount',
  initialState: {
    count: 0,
  },
  reducers: {
    updateOnlineCount: (state, { payload }) => {
      state.count = payload;
    },
  },
});

export const { updateOnlineCount } = onlineCountSlice.actions;
export default onlineCountSlice.reducer;
