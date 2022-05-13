import React, {useContext} from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";

import Image from "next/image";
import { ConnectButton } from "web3uikit";

import logo from "../../assets/app-logo.jpg";
import { GenesisContext } from "../../context/GenesisContext";

const styles = {
  header: "flex justify-around items-center h-20 bg-[#1A132F]",
  logoContainer: "flex items-center justify-between ml-10",
  logo: "rounded-md",
  logoText: "text-white font-bold text-xl ml-5",
  headerItems: "flex items-center justify-end",
  headerItem: "flex text-white items-center cursor-pointer font-semibold",
  button:
    "bg-[#0E3056] hover:bg-[#333C83] text-white font-bold py-2 px-4 rounded shadow-xl",
};

const Header = () => {

  const { balance } = useContext(GenesisContext)
  console.log(balance)
  console.log(balance)
  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Image alt="logo" src={logo} className={styles.logo} width={50} height={50}/>
        <div className={styles.logoText}>Genesis Coin</div>
      </div>
      <div className={styles.headerItems}>
      <div className={styles.headerItem}>
        <MdAccountBalanceWallet/>
        {`GS Balance: ${balance}`}
       </div>
      <div className={styles.headerItem}>
        <ConnectButton />
       </div>
      </div>
    </div>
  );
};

export default Header;
