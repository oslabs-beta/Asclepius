import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AwsCLIInst from "./AwsCLIInst.jsx";

const AwsForm = () => {
  const [IDVisible, setIDVisible] = useState(false);
  const [KeyVisible, setKeyVisible] = useState(false);
  const [chooseForm, setForm] = useState(true);
  const [Install, setInstall] = useState(false);
  const [message, setMessage] = useState(null);
  const [auth, setAuth] = useState(false);

  const awsSubmit = (e) => {
    e.preventDefault();
    const data = {
      profileName: e.target.elements.profileName.value,
      region: e.target.elements.region.value,
      accessID: e.target.elements.accessID.value,
      accessKey: e.target.elements.accessKey.value,
    };
    console.log("this is form submit data:", data);
    fetch("http://localhost:3000/awslogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setForm(false);
        setAuth(true);
        setMessage(null);
      } else if (response.status === 404) {
        console.log("done");
        setForm(false);
        setInstall(true);
        setMessage(null);
        console.log(Install);
      } else
        setMessage("Configure failed: Please verify form inputs and try again");
    });
  };

  const awsAuth = (e) => {
    e.preventDefault();
    const data = {
      clusterName: e.target.elements.clusterName.value,
    };
    console.log("this is form submit data:", data);
    fetch("http://localhost:3000/awslogin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
      } else {
      }
    });
  };

  const togglePasswordVisibility = (name) => {
    const inputField = document.getElementsByName(name)[0];

    if (name === "accessID") {
      // Toggle the password visibility
      inputField.type = IDVisible ? "password" : "text";

      // Update the state to reflect the new visibility status
      setIDVisible(!IDVisible);
    } else {
      // Toggle the password visibility
      inputField.type = KeyVisible ? "password" : "text";

      // Update the state to reflect the new visibility status
      setKeyVisible(!KeyVisible);
    }
  };

  return (
    <div>
      {Install ? <AwsCLIInst /> : null}
      {Install ? (
        <button
          onClick={() => {
            setInstall(false);
          }}
        >
          AWS CLI Installed
        </button>
      ) : null}
      {auth ? (
        <form onSubmit={awsAuth}>
          <label>Cluster Name:</label>
          <input type="text" name="clusterName" className="inputBox"></input>
          <button type="submit">Authenticate AWS Config</button>
        </form>
      ) : null}
      {chooseForm ? (
        <form onSubmit={awsSubmit}>
          <label>Profile Name:</label>
          <input type="text" name="profileName" className="inputBox" />
          <label>Region:</label>
          <input type="text" name="region" className="inputBox" />
          <span>
            <label>Access Key Id:</label>
            <input
              type={IDVisible ? "text" : "password"}
              name="accessID"
              className="inputBox"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("accessID")}
            >
              Show
            </button>
          </span>
          <span>
            <label>Secret Access Key:</label>
            <input
              type={KeyVisible ? "text" : "password"}
              name="accessKey"
              className="inputBox"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("accessKey")}
            >
              Show
            </button>
          </span>
          <button type="submit">Configure AWS CLI</button>
        </form>
      ) : null}
      {<p>{message}</p>}
    </div>
  );
};

export default AwsForm;
