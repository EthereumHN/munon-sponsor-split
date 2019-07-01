import React, { useGlobal, useEffect, useState } from "reactn";
import { useWeb3 } from "web3-react";
import { Heading, Input, Button, Card, Text, Icon, Image } from "rimble-ui";
import { Container } from "reactstrap";
import SponsorshipContract from "../contracts/Sponsorship.json";
import MunonContract from "../contracts/HackathonMunon.json";

const Split = () => {
  const [web3Provider, setWeb3Provider] = useGlobal("web3Provider");
  const [transactionHash, setTransactionHash] = useState(0);
  const [tguBalance, setTguBalance] = useState(0);
  const [spsBalance, setSpsBalance] = useState(0);
  const [sponsorBalance, setSponsorBalance] = useGlobal("sponsorValue");
  const [balance, setBalance] = useGlobal("balance");
  const [networkId, setNetworkId] = useGlobal("networkId");
  const [account, setAccount] = useGlobal("account");
  let sponsorshipInstance;
  let munonInstance;

  useEffect(() => {
    const fetchData = async () => {
      if (networkId) {
        getSponsorData();
        getHackathonData();
      }
    };

    fetchData();
  }, []);

  async function getUserBalance() {
    var value = await web3Provider.eth.getBalance(account);
    value = await web3Provider.utils.fromWei(value, "ether");
    setBalance(value);
  }

  async function getSponsorData() {
    sponsorshipInstance = web3Provider.eth.Contract(
      SponsorshipContract.abi,
      SponsorshipContract.networks[networkId].address
    );
    var sponsorValue = await web3Provider.eth.getBalance(
      sponsorshipInstance.address
    );
    sponsorValue = web3Provider.utils.fromWei(sponsorValue, "ether");
    setSponsorBalance(sponsorValue);
  }

  async function getHackathonData() {
    munonInstance = web3Provider.eth.Contract(
      MunonContract.abi,
      MunonContract.networks[networkId].address
    );
    let tguHack = await munonInstance.methods.hackathons(1).call();
    let spsHack = await munonInstance.methods.hackathons(1).call();
    let tguValue = web3Provider.utils.fromWei(tguHack.pot._hex, "ether");
    setTguBalance(tguValue);
    let spsValue = web3Provider.utils.fromWei(spsHack.pot._hex, "ether");
    setSpsBalance(spsValue);
  }

  function splitTransaction() {
    sponsorshipInstance.methods.splitSponsorship
      .send({
        from: account
      })
      .on("transactionHash", hash => {
        console.log(hash);
      })
      .on("receipt", receipt => {
        console.log(receipt);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        getSponsorData();
        getHackathonData();
        getUserBalance();
      })
      .on("error", console.error);
  }

  if (networkId) {
    getHackathonData();
  }
  return (
    <>
      <Card width={"420px"} mx={"auto"} px={4} my={4}>
        <Text
          caps
          fontSize={0}
          fontWeight={4}
          display={"flex"}
          alignItems={"center"}
        >
          <Icon name={"AttachMoney"} mr={2} />
          Assign To Hackathons:
        </Text>
        <Text
          fontSize={0}
          fontWeight={4}
          display={"flex"}
          alignItems={"center"}
          ml={2}
        >
          <b>TGU Balance: {tguBalance} ETH</b>
          <br /> <br />
        </Text>
        <Text
          fontSize={0}
          fontWeight={4}
          mb={3}
          ml={2}
          display={"flex"}
          alignItems={"center"}
        >
          <b>SPS Balance: {spsBalance} ETH</b>
        </Text>
        <Container>
          <Button className="mt-2" width={1} onClick={splitTransaction}>
            Assign
          </Button>
        </Container>
      </Card>
    </>
  );
};
export default Split;
