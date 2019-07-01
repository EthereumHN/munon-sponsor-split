import React, { useGlobal, useEffect, useState } from "reactn";
import { Heading, Input, Button, Card, Text, Icon, Image } from "rimble-ui";
import { Container } from "reactstrap";
import SponsorshipContract from "../contracts/Sponsorship.json";

const Transaction = () => {
  const [web3Provider, setWeb3Provider] = useGlobal("web3Provider");
  const [transactionHash, setTransactionHash] = useState(0);
  const [sponsorBalance, setSponsorBalance] = useGlobal("sponsorValue");
  const [balance, setBalance] = useGlobal("balance");
  const [networkId, setNetworkId] = useGlobal("networkId");
  const [sponsorshipInstance, setSponsorshipInstance] = useGlobal(
    "sponsorshipInstance"
  );
  const [value, setValue] = useState("");

  useEffect(() => {
    getSponsorData();
  }, []);

  async function getSponsorData() {
    web3Provider.eth.net.getId().then(result => console.log(result));
    const networkId = await web3Provider.eth.net.getId();

    setNetworkId(networkId);

    const sponsorshipInstance = web3Provider.eth.Contract(
      SponsorshipContract.abi,
      SponsorshipContract.networks[networkId].address
    );

    setSponsorshipInstance(sponsorshipInstance);
    var sponsorValue = await web3Provider.eth.getBalance(
      sponsorshipInstance.address
    );

    sponsorValue = web3Provider.utils.fromWei(sponsorValue, "ether");
    setSponsorBalance(sponsorValue);
  }

  async function getUserBalance() {
    var value = await web3Provider.eth.getBalance(web3Provider.account);
    value = await web3Provider.utils.fromWei(value, "ether");
    setBalance(value);
  }

  function sendTransaction() {
    sponsorshipInstance.methods.addSponsorship
      .send({
        value: web3Provider.utils.toWei(value, "ether"),
        from: web3Provider.account
      })
      .on("transactionHash", hash => {
        setValue("");
      })
      .on("receipt", receipt => {
        console.log(receipt);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        getSponsorData();
        getUserBalance();
      })
      .on("error", console.error);
  }

  return (
    <>
      <Heading.h3 className="text-center mb-3" my={4}>
        Current Sponsorship: {sponsorBalance} ETH
      </Heading.h3>
      <Card width={"420px"} mx={"auto"} px={4} my={0}>
        <Text
          caps
          fontSize={0}
          fontWeight={4}
          mb={3}
          display={"flex"}
          alignItems={"center"}
        >
          <Icon name={"AttachMoney"} mr={2} />
          Sponsor the Muñón Hackathon:
        </Text>
        <Container>
          <Input
            type="number"
            width={1}
            placeholder="Amount of ETH"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button className="mt-2" width={1} onClick={sendTransaction}>
            Sponsor!
          </Button>
        </Container>
      </Card>
    </>
  );
};
export default Transaction;
