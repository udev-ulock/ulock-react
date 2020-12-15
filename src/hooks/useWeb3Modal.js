import { useState, useEffect } from "react";
import providerOptions from "../ProviderOptions.js";
import Web3 from "web3";
import Web3Modal from "web3modal";

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

export default function useWeb3Modal(requestConnect, requestCacheReset) {
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (requestCacheReset) {
      web3Modal.clearCachedProvider();
    }
  }, [requestCacheReset]);

  useEffect(() => {
    console.log("request for connection");
    let provider;
    const accountsChangedCB = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };
    (async () => {
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts();

      provider.on("accountsChanged", accountsChangedCB);

      setProvider(provider);
      setWeb3(web3);
      if (web3 != null) {
        setAccount(accounts[0]);
      }
    })();
    return (provider, accountsChangedCB) => {
      if (provider) provider.off("accountsChanged", accountsChangedCB);
    };
  }, [requestConnect]);

  return { provider, web3, account };
}
