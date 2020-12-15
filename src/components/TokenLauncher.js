import { useState, useEffect } from "react";
import IXLOCKER from "../abi/IXLOCKER.json";
import addresses from "../addresses.json";

async function launchRequest(
  xlocker,
  web3,
  tokenName,
  tokenTicker,
  liqXeth,
  account,
  setIsModalVisible,
  setModalTitle,
  setModalBody
) {
  setModalTitle("Launch Request Sent");
  setModalBody(
    "Your launch request for " + tokenTicker + " was sent. Check your wallet."
  );
  setIsModalVisible(true);
  try {
    await xlocker.methods
      .launchERC20(
        tokenName,
        tokenTicker,
        web3.utils.toWei("1000000"),
        web3.utils.toWei(liqXeth.toString())
      )
      .send({
        from: account
      });
    setModalTitle("Launch Tx Complete");
    setModalBody(
      "Your launch request for " + tokenTicker + " successfully completed."
    );
    setIsModalVisible(true);
  } catch (e) {
    setModalTitle("Launch Tx Failed");
    setModalBody(
      "Your launch request for " + tokenTicker + " failed. Error:" + e
    );
    setIsModalVisible(true);
  }
}

function TokenLauncher({
  web3,
  account,
  setIsModalVisible,
  setModalTitle,
  setModalBody
}) {
  console.log("starting token launcher");
  const [tokenName, setTokenName] = useState(null);
  const [tokenTicker, setTokenTicker] = useState(null);
  const [liqXeth, setLiqXeth] = useState(null);
  const [xlocker, setXlocker] = useState(null);

  useEffect(() => {
    if (!web3 || !account) return;
    setXlocker(
      new web3.eth.Contract(IXLOCKER, addresses.mainnet.xlocker, {
        from: account
      })
    );
  }, [web3, account]);

  return (
    <>
      <h2>Token Name</h2>
      <input
        type="text"
        placeholder="Your New Token"
        onChange={(event) => {
          setTokenName(event.target.value);
        }}
      />
      <br />
      <br />
      <h2>Token Ticker</h2>
      <input
        type="text"
        placeholder="XYZ"
        onChange={(event) => {
          setTokenTicker(event.target.value);
        }}
      />
      <br />
      <br />
      <h2>Liq to Lock (xETH)</h2>
      <input
        type="number"
        placeholder="1000"
        onChange={(event) => {
          setLiqXeth(event.target.value);
        }}
      />
      <br />
      <br />
      <button
        className="color-wide"
        onClick={() =>
          launchRequest(
            xlocker,
            web3,
            tokenName,
            tokenTicker,
            liqXeth,
            account,
            setIsModalVisible,
            setModalTitle,
            setModalBody
          )
        }
      >
        Launch Token
      </button>
    </>
  );
}

export default TokenLauncher;
