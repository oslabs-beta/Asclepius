import { createSlice } from '@reduxjs/toolkit';

export const nodeSlice = createSlice({
    name: 'nodeName',

    initialState: {
        nodeName: 'Node1',
        kuberenetesAPI: null,
        kubeletAPI: null,
    },
    reducers: {
        
    },
});

export const {} = nodeSlice.actions;

export default nodeSlice.reducer;