import { useState, useEffect } from "react";
import IXETH from "../abi/IXETH.json";
import addresses from "../addresses.json";

async function wrapRequest(
  xeth,
  web3,
  setAccountXeth,
  value,
  account,
  setIsModalVisible,
  setModalTitle,
  setModalBody
) {
  setModalTitle("Wrap Tx Request Sent");
  setModalBody(
    "Your wrap request for " + value + " xEth was sent. Check your wallet."
  );
  setIsModalVisible(true);
  try {
    await xeth.methods.deposit().send({
      value: web3.utils.toWei(value.toString()),
      from: account
    });
    setModalTitle("Wrap Tx Complete");
    setModalBody(
      "Your wrap request for " + value + " xEth successfully completed."
    );
    setIsModalVisible(true);
  } catch (e) {
    setModalTitle("Wrap Tx Failed");
    setModalBody("Your wrap request for " + value + " xEth failed. Error:" + e);
    setIsModalVisible(true);
  }
  const accountXeth = await xeth.methods.balanceOf(account).call();
  setAccountXeth(accountXeth);
}

async function unwrapRequest(
  xeth,
  web3,
  setAccountXeth,
  value,
  account,
  setIsModalVisible,
  setModalTitle,
  setModalBody
) {
  setModalTitle("Unwrap Tx Request Sent");
  setModalBody(
    "Your unwrap request for " + value + " xEth was sent. Check your wallet."
  );
  setIsModalVisible(true);
  try {
    await xeth.methods.withdraw(web3.utils.toWei(value.toString())).send({
      from: account
    });
    setModalTitle("Unwrap Tx Complete");
    setModalBody(
      "Your unwrap request for " + value + " xEth successfully completed."
    );
    setIsModalVisible(true);
  } catch (e) {
    setModalTitle("Unwrap Tx Failed");
    setModalBody(
      "Your unwrap request for " + value + " xEth failed. Error:" + e
    );
    setIsModalVisible(true);
  }
  const accountXeth = await xeth.methods.balanceOf(account).call();
  setAccountXeth(accountXeth);
}

function XethWrapper({
  web3,
  account,
  setAccountXeth,
  setIsModalVisible,
  setModalTitle,
  setModalBody
}) {
  const [value, setValue] = useState(null);
  const [xeth, setXeth] = useState(null);

  useEffect(() => {
    if (!web3 || !account) return;
    setXeth(
      new web3.eth.Contract(IXETH, addresses.mainnet.xeth, {
        from: account
      })
    );
  }, [web3, account]);

  return (
    <>
      <h2>Wrap/Unwrap xETH</h2>
      <input
        type="number"
        placeholder="0.0"
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <br />
      <br />
      <button
        className="color-wide"
        onClick={() =>
          wrapRequest(
            xeth,
            web3,
            setAccountXeth,
            value,
            account,
            setIsModalVisible,
            setModalTitle,
            setModalBody
          )
        }
      >
        Wrap
      </button>
      <br />
      <br />
      <button
        className="color-wide"
        onClick={() =>
          unwrapRequest(
            xeth,
            web3,
            setAccountXeth,
            value,
            account,
            setIsModalVisible,
            setModalTitle,
            setModalBody
          )
        }
      >
        Unwrap
      </button>
      <p>Circulating xETH is 1:1 backed by ETH.</p>
    </>
  );
}

export default XethWrapper;
