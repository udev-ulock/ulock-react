import React from 'react'
import XLock from './xLock.js'

function Header({
  web3,
  account,
  accountXeth,
  requestConnect,
  setRequestConnect,
  requestCacheReset,
  setRequestCacheReset
}) {
  return (
    <React.Fragment>
    <header className="App-header">
      {/* <img src={ipfsMediaSrc("logo-h.svg")} className="App-header-logo" /> */}
      {web3 == null ? (
        <button
          className="App-header-button"
          onClick={() => setRequestConnect(requestConnect + 1)}
        >
          Connect
        </button>
      ) : (
        <>
          {!!account ? (
            <p className="App-header-Address">
              Connected account:
              <br />
              {account}
              <br />
              xETH: {Number(web3.utils.fromWei(accountXeth)).toPrecision(10)}
            </p>
          ) : (
            <p className="App-header-Address">
              No Account: Reset cache then refresh the page.
              <br />
              <button
                onClick={() => setRequestCacheReset(requestCacheReset + 1)}
              >
                Reset Cache
              </button>
            </p>
          )}
        </>
      )}

    </header>
    </React.Fragment>
  );
}

export default Header;
