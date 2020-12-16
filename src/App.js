import { useState, useEffect } from "react";
import "./App.css";
import IXETH from "./abi/IXETH.json";
import addresses from "./addresses.json";
import useWeb3Modal from "./hooks/useWeb3Modal.js";
import Header from "./components/Header.js";
import Logo from './components/Logo'
import TokenLauncher from "./components/TokenLauncher.js";
import XethWrapper from "./components/XethWrapper.js";
import Info from "./components/Info.js";
import Footer from "./components/Footer.js";
import Modal from "./components/Modal.js";


function App() {
  const [requestConnect, setRequestConnect] = useState(0);
  const [requestCacheReset, setRequestCacheReset] = useState(null);
  const { provider, web3, account } = useWeb3Modal(
    requestConnect,
    requestCacheReset
  );
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [accountXeth, setAccountXeth] = useState("0");
  const [xeth, setXeth] = useState(null);

  useEffect(() => {
    if (!web3 || !account) return;
    const xeth = new web3.eth.Contract(IXETH, addresses.mainnet.xeth, {
      from: account
    });
    setXeth(xeth);
    (async () => {
      const accountXeth = await xeth.methods.balanceOf(account).call();
      setAccountXeth(accountXeth);
    })();
  }, [web3, account]);

  return (
    <div className="App">
      <Header
        web3={web3}
        account={account}
        accountXeth={accountXeth}
        requestConnect={requestConnect}
        setRequestConnect={setRequestConnect}
        requestCacheReset={requestCacheReset}
        setRequestCacheReset={setRequestCacheReset}
      />
      <br />
      <Logo />
      <div className="flex-container">
        <div className="flex-child-2col">
          <TokenLauncher
            web3={web3}
            account={account}
            setIsModalVisible={setIsModalVisible}
            setModalTitle={setModalTitle}
            setModalBody={setModalBody}
          />
        </div>
        <div className="flex-child-2col">
          <XethWrapper
            web3={web3}
            account={account}
            setAccountXeth={setAccountXeth}
            setIsModalVisible={setIsModalVisible}
            setModalTitle={setModalTitle}
            setModalBody={setModalBody}
          />
        </div>
      </div>
      <Info />
      <Modal
        title={modalTitle}
        body={modalBody}
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <Footer />
    </div>
  );
}

export default App;
