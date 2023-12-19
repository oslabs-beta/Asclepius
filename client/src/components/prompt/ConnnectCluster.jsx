import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/slices/nodeSlice.js";

function ConnectCluster() {
  const dispatch = useDispatch();

  const getData = () => {
    fetch(`http://localhost:3000/getData`)
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data I need: ", data);
        dispatch(setData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={() => getData()}>Connect Cluster</button>
    </div>
  );
}

export default ConnectCluster;
