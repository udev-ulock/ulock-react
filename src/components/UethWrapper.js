import { useState, useEffect } from 'react';
import IUETH from '../abi/IUETH.json';
import addresses from '../addresses.json';


async function wrapRequest(ueth, web3, setAccountUeth, value, account, setIsModalVisible, setModalTitle, setModalBody) {
    setModalTitle("Wrap Tx Request Sent")
    setModalBody("Your wrap request for "+value+" uEth was sent. Check your wallet.")
    setIsModalVisible(true)
    try {
        await ueth.methods.deposit().send({
            value:web3.utils.toWei(value.toString()),
                from:account
            }
        )
        setModalTitle("Wrap Tx Complete")
        setModalBody("Your wrap request for "+value+" uEth successfully completed.")
        setIsModalVisible(true)
    } catch(e) {
        setModalTitle("Wrap Tx Failed")
        setModalBody("Your wrap request for "+value+" uEth failed. Error:"+e)
        setIsModalVisible(true)
    }
    const accountUeth = await ueth.methods.balanceOf(account).call()
    setAccountUeth(accountUeth)
}

async function unwrapRequest(ueth, web3, setAccountUeth, value, account, setIsModalVisible, setModalTitle, setModalBody) {
    setModalTitle("Unwrap Tx Request Sent")
    setModalBody("Your unwrap request for "+value+" uEth was sent. Check your wallet.")
    setIsModalVisible(true)
    try {
        await ueth.methods.withdraw(
                web3.utils.toWei(value.toString())
            ).send({
                from:account
            }
        )
        setModalTitle("Unwrap Tx Complete")
        setModalBody("Your unwrap request for "+value+" uEth successfully completed.")
        setIsModalVisible(true)
    } catch(e) {
        setModalTitle("Unwrap Tx Failed")
        setModalBody("Your unwrap request for "+value+" uEth failed. Error:"+e)
        setIsModalVisible(true)
    }
    const accountUeth = await ueth.methods.balanceOf(account).call()
    setAccountUeth(accountUeth)
}

function UethWrapper({web3, account, setAccountUeth, setIsModalVisible, setModalTitle, setModalBody}) {

    const [value, setValue] = useState(null)
    const [ueth, setUeth] = useState(null)

    useEffect(()=>{
        if(!web3 || !account) return;
        setUeth(
            new web3.eth.Contract(
                IUETH,
                addresses.mainnet.ueth,
                {
                    from:account
                }
            )
        )
    },[web3,account])


    
    return (<>
        <h2>Wrap/Unwrap uETH</h2>
        <input type="number" placeholder="0.0" onChange={(event)=>{setValue(event.target.value)}} />
        <br/><br/>
        <button
            className="color-wide"
            onClick={()=>wrapRequest(ueth, web3, setAccountUeth, value, account, setIsModalVisible, setModalTitle, setModalBody)}
        >
            Wrap
        </button>
        <br/><br/>
        <button
            className="color-wide"
            onClick={()=>unwrapRequest(ueth, web3, setAccountUeth, value, account, setIsModalVisible, setModalTitle, setModalBody)}
        >
            Unwrap
        </button>
        <p>
        Circulating uETH is 1:1 backed by ETH.
        </p>
    </>);
}

export default UethWrapper;
