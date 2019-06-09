import React, { useGlobal, useState } from "reactn";
import Web3Provider from "web3-react";
import "./App.scss";
import connectors from "./connectors";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import Transaction from "./components/Transaction";

import web3 from "web3";
import Split from "./components/Split";

const App = () => {
  const [account, setAccount] = useGlobal("account");
  const [web3Context, setWeb3Context] = useState("");
  getWeb3Change = getWeb3Change.bind(this);
  function getWeb3Change(value) {
    setWeb3Context(value);
  }
  if (account) {
    return (
      <Web3Provider
        connectors={connectors}
        libraryName={"web3.js"}
        web3Api={web3}
      >
        <Header />
        <Transaction />
        <Split />
      </Web3Provider>
    );
  } else {
    return (
      <Web3Provider
        connectors={connectors}
        libraryName={"web3.js"}
        web3Api={web3}
      >
        <ConnectWallet />
      </Web3Provider>
    );
  }
};

export default App;
