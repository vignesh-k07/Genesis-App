import React, { useContext, useEffect } from 'react'
// import { HashLoader } from 'react-spinners'
import Link from 'next/link';

import { GenesisContext } from '../../context/GenesisContext';


const styles = {
  hero: "flex flex-col items-center justify-start text-white bg-[#2A2550] h-full",
  inputContainer:
    "flex w-2/3 h-20 bg-[#4D4C7D] justify-center items-center rounded-lg m-5",
  resultContainer:
    "flex flex-col w-5/6 h-4/6 bg-[#4D4C7D] items-center rounded-lg m-5 text-center p-10",
  input:
    "appearance-none block w-5/6 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
  resultWord: "text-3xl font-bold",
  resultDefinition: "font-semibold",
  clearX: "w-full flex justify-end",
  button: "bg-gray-800 w-[150px] h-[35px] rounded-md",
  title: `text-3xl font-bold flex flex-1 items-center mt-[20px] justify-center mb-[40px]`,
  content: `flex w-full mb-[30px] text-xl justify-center`,
  input: `w-[50%] h-[50px] bg-[#f7f6f2] rounded-lg p-[10px] flex mx-auto text-black`,
  inputBox: `w-full h-full flex items-center justify-center bg-[#f7f6f2] focus:outline-none`,
  price: `w-full h-full flex justify-center items-center mt-[20px] font-bold text-3xl`,
  buyBtn: `w-[20%] h-[50px] bg-[#000] mt-[40px] rounded-lg p-[10px] flex mx-auto text-white justify-center items-center cursor-pointer`,
  etherscan: `w-full h-full flex items-center justify-center text-green-500 text-2xl mt-[20px] font-bold cursor-pointer`,
  success: `w-full h-full flex items-center justify-center text-xl mt-[20px] font-bolder`,
};

const Hero = () => {

  const {
    amountDue,
    setAmountDue,
    tokenAmount,
    setTokenAmount,
    isLoading,
    setIsLoading,
    etherscanLink,
    setEtherscanLink,
    buyTokens
  } = useContext(GenesisContext)
  
  const calculatePrice = () => {
    const price = parseFloat(tokenAmount * 0.0001)
    price = price.toFixed(4)
    setAmountDue(price)
  }


  useEffect(() => {
    calculatePrice()
  },[tokenAmount])

  return (
    <div className={styles.hero}>
      <div className={styles.resultContainer}>
        <div className={styles.clearX}>
          <button
          onClick={() => {
            setAmountDue('')
            setTokenAmount('')
            setEtherscanLink('')
          }} 
          className={styles.button} type='button'>Clear</button>
        </div>
        <div className={styles.title}>
          Buy Genesis Coins Here!
        </div>
        <div className={styles.content}>
          Select how many tokens would you like to buy.
        </div>
        <div className={styles.input}>
          <input
          type='text'
          placeholder='Amount...'
          className={styles.inputBox}
          onChange={e => setTokenAmount(e.target.value)}
          value={tokenAmount}
           />
        </div>
        <div className={styles.price}>
          Total Due: {``}
          {tokenAmount && tokenAmount > 0 ? amountDue + 'ETH' : '0 ETH'}
        </div>
        <button className={styles.buyBtn}
        disabled={!tokenAmount || tokenAmount < 0}
        onClick={() => {
          setIsLoading(true)
          buyTokens()
        }}
        >
          Buy
        </button>
        {etherscanLink && (
          <>
          <div className={styles.success}>
            Transaction Successful! Check out your receipt for your transaction
          </div>
          <Link href={`${etherscanLink}`} className={styles.etherscan}>
            <a className={styles.etherscan} target="_blank" >
              Transaction Receipt
            </a>
          </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
