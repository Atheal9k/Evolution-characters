const TestMint = artifacts.require("MintNft.sol")

module.exports = async (callback) => {
  const testMint = await TestMint.deployed()
  const aaa = await testMint.setTokenURI(
    1,
    "ipfs://QmQJGwZrZQVYhUTj71yJM7DtYcqdtGDVq5pkMknCpm84j1"
  )
  console.log("pinned to IPFS")
  callback(aaa.tx)
}
