import { useState, useEffect } from 'react';
import IULOCKER from '../abi/IULOCKER.json';
import addresses from '../addresses.json';

async function launchRequest(ulocker, web3, tokenName, tokenTicker, liqUeth, account, setIsModalVisible, setModalTitle, setModalBody) {
    setModalTitle("Launch Request Sent")
    setModalBody("Your launch request for "+tokenTicker+" was sent. Check your wallet.")
    setIsModalVisible(true)
    try {
        await ulocker.methods.launchERC20(
            tokenName,
            tokenTicker,
            web3.utils.toWei("1000000"),
            web3.utils.toWei(liqUeth.toString())
            ).send(
            {
                from:account
            }
        )
        setModalTitle("Launch Tx Complete")
        setModalBody("Your launch request for "+tokenTicker+" successfully completed.")
        setIsModalVisible(true)
    } catch(e) {
        setModalTitle("Launch Tx Failed")
        setModalBody("Your launch request for "+tokenTicker+" failed. Error:"+e)
        setIsModalVisible(true)
    }
}

function TokenLauncher({web3, account, setIsModalVisible, setModalTitle, setModalBody}) {
    console.log("starting token launcher")
    const [tokenName, setTokenName] = useState(null)
    const [tokenTicker, setTokenTicker] = useState(null)
    const [liqUeth, setLiqUeth] = useState(null)
    const [ulocker, setUlocker] = useState(null)
    
    useEffect(()=>{
        if(!web3 || !account) return;
        setUlocker(
            new web3.eth.Contract(
                IULOCKER,
                addresses.mainnet.ulocker,
                {
                    from:account
                }
            )
        )
    },[web3,account])

    return (<>
        <h2>Token Name</h2>
        <input type="text" placeholder="Your New Token" onChange={(event)=>{setTokenName(event.target.value)}} />
        <br/><br/>
        <h2>Token Ticker</h2>
        <input type="text" placeholder="XYZ" onChange={(event)=>{setTokenTicker(event.target.value)}} />
        <br/><br/>
        <h2>Liq to Lock (uETH)</h2>
        <input type="number" placeholder="1000" onChange={(event)=>{setLiqUeth(event.target.value)}} />
        <br/><br/>
        <button 
            className="color-wide"
            onClick={()=>launchRequest(ulocker, web3, tokenName, tokenTicker, liqUeth, account, setIsModalVisible, setModalTitle, setModalBody)}
        >
            Launch Token
        </button>
    </>);
}

export default TokenLauncher;
