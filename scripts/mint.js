const TestMint = artifacts.require("MintNft.sol")

module.exports = async (callback) => {
  const testMint = await TestMint.deployed()
  const aaa = await testMint.printUniqueAsset(
    "0x2Ac95B744f4eAB40B56281Eca7b4aC8b64dfda77"
  )
  console.log("minted!")
  callback(aaa.tx)
}
