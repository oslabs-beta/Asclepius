import { createSlice } from '@reduxjs/toolkit';

export const nodeSlice = createSlice({
    name: 'nodeName',

    initialState: {
        clusterName: 'demoAKS',
        nodes: [
            { 
                name: "node 1",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "yellow",
                id: 1
            },
            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 2
            },
            { 
                name: "node 3",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 3
            },
            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 4
            },            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 5
            },            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 6
            },            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 7
            },            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 8
            },            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 9
            },            { 
                name: "node 2",
                cpuPercentage: "10%",
                memPercentage: "51%",
                color: "green",
                id: 10
            },
           ]
    },
    reducers: {
        
    },
});

export const {} = nodeSlice.actions;

export default nodeSlice.reducer;