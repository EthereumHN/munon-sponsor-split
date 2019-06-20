import React, { useGlobal, useEffect, useState } from "reactn";
import { useWeb3Context } from "web3-react";
import { Heading, Input, Button, Card, Text, Icon, Image } from "rimble-ui";
import { Container } from "reactstrap";
import SponsorshipContract from "../contracts/Sponsorship.json";
import MunonContract from "../contracts/HackathonMunon.json";

const Split = () => {
  const context = useWeb3Context();
  const [transactionHash, setTransactionHash] = useState(0);
  const [tguBalance, setTguBalance] = useState(0);
  const [spsBalance, setSpsBalance] = useState(0);
  const [sponsorBalance, setSponsorBalance] = useGlobal("sponsorValue");
  const [balance, setBalance] = useGlobal("balance");
  const sponsorshipInstance = context.library.eth.Contract(
    SponsorshipContract.abi,
    SponsorshipContract.networks[context.networkId].address
  );
  const munonInstance = context.library.eth.Contract(
    MunonContract.abi,
    MunonContract.networks[context.networkId].address
  );
  useEffect(() => {
    getSponsorData();
    getHackathonData();
  }, []);

  async function getUserBalance() {
    var value = await context.library.eth.getBalance(context.account);
    value = await context.library.utils.fromWei(value, "ether");
    setBalance(value);
  }

  async function getSponsorData() {
    var sponsorValue = await context.library.eth.getBalance(
      sponsorshipInstance.address
    );
    sponsorValue = context.library.utils.fromWei(sponsorValue, "ether");
    setSponsorBalance(sponsorValue);
  }

  async function getHackathonData() {
    let tguHack = await munonInstance.methods.hackathons(2).call();
    let spsHack = await munonInstance.methods.hackathons(1).call();
    let tguValue = context.library.utils.fromWei(tguHack.pot._hex, "ether");
    setTguBalance(tguValue);
    let spsValue = context.library.utils.fromWei(spsHack.pot._hex, "ether");
    setSpsBalance(spsValue);
  }

  function splitTransaction() {
    sponsorshipInstance.methods.splitSponsorship
      .send({
        from: context.account
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
