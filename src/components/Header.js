import ipfsMediaSrc from "../utils.js"

function Header({web3, account, accountUeth, requestConnect, setRequestConnect, requestCacheReset, setRequestCacheReset}) {
    

    return (
        <header className="App-header">
            <img src={ipfsMediaSrc("logo-h.svg")} className="App-header-logo" />
            { web3 == null ? (
                <button className="App-header-button" onClick={()=>setRequestConnect(requestConnect+1)}>Connect</button>
            ) : (<>{ (!!account) ? (
                <p className="App-header-Address">
                    Connected account:<br/>
                    {account}<br/>
                    uETH: {Number(web3.utils.fromWei(accountUeth)).toPrecision(10)}
                </p>
                ) : (
                <p className="App-header-Address">
                    No Account: Reset cache then refresh the page.<br/>
                    <button onClick={()=>setRequestCacheReset(requestCacheReset+1)}>Reset Cache</button>
                </p>
                )
                }</>)
            
            }
        
        </header>
    );
}

export default Header;
