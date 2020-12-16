import Telegram from '../assets/telegram.svg'
import Uniswap from '../assets/uniswap.svg'

function Footer() {
  return (
    <footer>
      <a target="_blank" rel="noreferrer noopener" href="https://t.me/LIDProtocol">
        <img src={Telegram} alt="LID Protocol Telegram"/>
      </a>
      <a target="_blank" rel="noreferrer noopener" href="https://info.uniswap.org/pair/0xc822d85d2dcedfaf2cefcf69dbd5588e7ffc9f10">
        <img src={Uniswap} alt="LID Protocol xLock on Uniswap"/>
      </a>
    </footer>
  );
}

export default Footer;
