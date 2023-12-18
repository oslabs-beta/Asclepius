import React from 'react';
import NodeMapContainer from './containers/NodeMapContainer.jsx';
import SideBarContainer from './containers/SideBarContainer.jsx';



function App() {

    return (
        <div>
            <span><SideBarContainer/> </span>
            <span><NodeMapContainer/> </span>
        </div>
    );
}


export default App;
