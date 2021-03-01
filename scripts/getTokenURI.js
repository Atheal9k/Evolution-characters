const TestMint = artifacts.require("MintNft.sol")

module.exports = async (callback) => {
  const testMint = await TestMint.deployed()
  const aaa = await testMint.getTokenURI(0)
  console.log(aaa)
  callback(aaa.tx)
}
