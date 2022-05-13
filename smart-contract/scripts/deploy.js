const hre = require('hardhat')

async function main() {
  const genesisCoinFactory = await hre.ethers.getContractFactory('GenesisCoin')
  const genesisCoin = await genesisCoinFactory.deploy()

  await genesisCoin.deployed()

  console.log('Genesis Coin deployed to:', genesisCoin.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })