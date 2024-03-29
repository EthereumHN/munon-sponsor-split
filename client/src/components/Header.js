import React, { useGlobal, useEffect, useState } from "reactn";
import { useWeb3Context } from "web3-react";
import { Alert, Nav, NavItem } from "reactstrap";
import { Blockie, Link, Icon } from "rimble-ui";
import "./Header.scss";

const Header = () => {
  const [balance, setBalance] = useGlobal("balance");
  const [account, setAccount] = useGlobal("account");

  useEffect(() => {
    const fetchData = async () => {
      var value = await context.library.eth.getBalance(account);
      value = await context.library.utils.fromWei(value, "ether");
      setBalance(value);
    };

    fetchData();
  }, []);
  const context = useWeb3Context();
  const { networkId } = context;
  let money = "";
  switch (networkId) {
    case 100:
      money = "xDAI";
      break;
    case 99:
      money = "POA";
      break;
    case 77:
      money = "SPOA";
      break;
    default:
      money = "ETH";
      break;
  }

  return (
    <>
      <Nav className="mt-4 justify-content-end">
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Link href="/" color="secondary" className="secondary">
            <span>
              <Icon name="Home" size="20" className="mr-1" />
              Home
            </span>
          </Link>
        </NavItem>
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Icon
            name="AccountBalanceWallet"
            size="20"
            className="mr-1"
            color="primary"
          />
          <span className="mt-1">
            Balance: {balance} {money}
          </span>
        </NavItem>
        <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
          <Link
            href="#"
            color="secondary"
            onClick={() => {
              context.unsetConnector();
              setAccount(null);
            }}
            className="secondary"
          >
            <span>
              <Icon name="ExitToApp" size="20" className="mr-1" />
              Log Out
            </span>
          </Link>
        </NavItem>
        <NavItem className="ml-2 mt-1 text-right">
          <b>Current Account:</b> <br />
          <label>{account}</label>
        </NavItem>
        <NavItem className="ml-2 mr-4">
          <Blockie
            opts={{
              seed: account,
              size: 10,
              scale: 5
            }}
          />
        </NavItem>
      </Nav>
    </>
  );
};
export default Header;
