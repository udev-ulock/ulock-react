import ipfsMediaSrc from "../utils.js"

function Footer() {
    return (
        <footer>
            <a href="https://t.me/UniswapLock">
            <img src={ipfsMediaSrc("telegram.svg")} />
            </a>
            <a href="https://github.com/udev-ulock?tab=repositories">
            <img src={ipfsMediaSrc("github.svg")} />
            </a>
            <a href="https://info.uniswap.org/pair/0x952a51ca1e6267bcbca6212d2c3a67abf5195017">
            <img src={ipfsMediaSrc("uniswap.svg")} />
            </a>
        </footer>
    );
}

export default Footer;
