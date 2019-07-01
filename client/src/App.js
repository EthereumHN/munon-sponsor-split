import React, { useGlobal, useState } from "reactn";
import "./App.scss";
import Header from "./components/Header";
import Transaction from "./components/Transaction";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./assets/logo.png";
import Web3Connect from "web3connect";

import web3 from "web3";
import Split from "./components/Split";

const App = () => {
  const [account, setAccount] = useGlobal("account");
  const [web3Provider, setWeb3Provider] = useGlobal("web3Provider");

  if (web3Provider) {
    return (
      <Router>
        <Header /> <img src={logo} className="App-logo" alt="logo" />
        <Transaction />
        <Route path="/admin" exact component={Split} />
      </Router>
    );
  } else {
    return (
      <div className="container h-100">
        <div className="row">
          <div className="col-12">
            <img src={logo} className="App-logo" alt="logo" />{" "}
            <div className="web3Button">
              <Web3Connect.Button
                providerOptions={{
                  portis: {
                    id: process.env.REACT_APP_PORTIS_ID,
                    network: "mainnet" // optional
                  },
                  fortmatic: {
                    key: process.env.REACT_APP_FORTMATIC_KEY
                  }
                }}
                onConnect={provider => {
                  const web3Object = new web3(provider);
                  web3Object.eth
                    .getAccounts()
                    .then(accounts => setAccount(accounts[0]));
                  setWeb3Provider(web3Object);
                }}
                onClose={() => {
                  console.log("Web3Connect Modal Closed"); // modal has closed
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
