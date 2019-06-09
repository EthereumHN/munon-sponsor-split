import React, { useGlobal, useEffect, useState } from "reactn";
import { useWeb3Context } from "web3-react";
import { Heading, Input, Button, Card, Text, Icon, Image } from "rimble-ui";
import { Container } from "reactstrap";
import SponsorshipContract from "../contracts/Sponsorship.json";

const Transaction = () => {
  const context = useWeb3Context();
  const [transactionHash, setTransactionHash] = useState(0);
  const [sponsorBalance, setSponsorBalance] = useGlobal("sponsorValue");
  const [balance, setBalance] = useGlobal("balance");
  const [value, setValue] = useState("");
  const sponsorshipInstance = context.library.eth.Contract(
    SponsorshipContract.abi,
    SponsorshipContract.networks[context.networkId].address
  );
  useEffect(() => {
    getSponsorData();
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

  function sendTransaction() {
    sponsorshipInstance.methods.addSponsorship
      .send({
        value: context.library.utils.toWei(value, "ether"),
        from: context.account
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
