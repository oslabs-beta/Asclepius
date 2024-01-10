import React from 'react';
import NodeMapContainer from './containers/NodeMapContainer.jsx';
import SideBarContainer from './containers/SideBarContainer.jsx';
import '../styles.scss';

function App() {
  return (
    <div id='AppContainer'>
      <SideBarContainer />
      <NodeMapContainer />
    </div>
  );
}

export default App;
