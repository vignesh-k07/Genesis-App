import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { ethers } from "ethers";

import { genesisAbi, genesisCoinAddress} from "../lib/constants";

export const GenesisContext = createContext();

export const GenesisProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const [amountDue, setAmountDue] = useState('')
    const [etherscanLink, setEtherscanLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [balance, setBalance] = useState('')


    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
      } = useMoralis();



      const getBalance = async () => {
        try {
          if (!isAuthenticated || !currentAccount) return
          const options = {
            contractAddress: genesisCoinAddress,
            functionName: 'balanceOf',
            abi: genesisAbi,
            params: {
              account: currentAccount,
            },
          }
    
          if (isWeb3Enabled) {
            const response = await Moralis.executeFunction(options)
            setBalance(response.toString())
            console.log(response.toString())
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      const buyTokens = async () => {
        if (!isAuthenticated) {
          await connectWallet()
        }
    
        const amount = ethers.BigNumber.from(tokenAmount)
        const price = ethers.BigNumber.from('50000000000')
        const calcPrice = amount.mul(price)
    
        console.log(genesisCoinAddress)
    
        let options = {
          contractAddress: genesisCoinAddress,
          functionName: 'mint',
          abi: genesisAbi,
          msgValue: calcPrice,
          params: {
            amount,
          },
        }

        const transaction = await Moralis.executeFunction(options)
        const receipt = await transaction.wait()
        setIsLoading(false)
        console.log(receipt)
        setEtherscanLink(
          `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
        )
        console.log(etherscanLink)
      }

      useEffect(() => {
          ;(async()=> {
              if(isAuthenticated){
                await getBalance()
                  console.log(balance)
                  const account = await user?.get('ethAddress')
                  setCurrentAccount(account)
              }
          })();
      },[isAuthenticated, user, currentAccount, getBalance])







  return (
    <GenesisContext.Provider
    value={
      {
        isAuthenticated,
        balance,
        setTokenAmount,
        tokenAmount,
        amountDue,
        setAmountDue,
        isLoading,
        setIsLoading,
        setEtherscanLink,
        etherscanLink,
        currentAccount,
        buyTokens
      }
    }
    >{children}
    </GenesisContext.Provider>
  );
};
