import { useState, useEffect } from 'react';
import './App.css';
import IUETH from './abi/IUETH.json';
import addresses from './addresses.json';
import useWeb3Modal from './hooks/useWeb3Modal.js'
import Header from './components/Header.js'
import TokenLauncher from './components/TokenLauncher.js'
import UethWrapper from './components/UethWrapper.js'
import Info from './components/Info.js'
import Footer from './components/Footer.js'
import Modal from './components/Modal.js'

function App() {
  const [requestConnect, setRequestConnect] = useState(0)
  const [requestCacheReset, setRequestCacheReset] = useState(null)
  const {provider, web3, account} = useWeb3Modal(requestConnect,requestCacheReset);
  const [modalTitle, setModalTitle] = useState(null)
  const [modalBody, setModalBody] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  
  const [accountUeth, setAccountUeth] = useState("0")
  const [ueth, setUeth] = useState(null)

  useEffect(()=>{
      if(!web3 || !account) return;
      const ueth = new web3.eth.Contract(
          IUETH,
          addresses.mainnet.ueth,
          {
              from:account
          }
      );
      setUeth(ueth);
      (async ()=> {
          const accountUeth = await ueth.methods.balanceOf(account).call()
          setAccountUeth(accountUeth)
      })();
  },[web3,account])


  return (
    <div className="App">
      <Header web3={web3} account={account} accountUeth={accountUeth} requestConnect={requestConnect} setRequestConnect={setRequestConnect} requestCacheReset={requestCacheReset} setRequestCacheReset={setRequestCacheReset} />
      <br/>
      <h1>U lock what you like!</h1>
      <div className="flex-container">
        <div className="flex-child-2col">
          <TokenLauncher web3={web3} account={account} setIsModalVisible={setIsModalVisible} setModalTitle={setModalTitle} setModalBody={setModalBody} />
        </div>
        <div className="flex-child-2col">
          <UethWrapper web3={web3} account={account} setAccountUeth={setAccountUeth} setIsModalVisible={setIsModalVisible} setModalTitle={setModalTitle} setModalBody={setModalBody} />
        </div>
      </div>
      <Info />
      <Modal title={modalTitle} body={modalBody} isVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
      <Footer />
    </div>
  );
}

export default App;
