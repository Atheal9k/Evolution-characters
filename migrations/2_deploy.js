const TestMinter = artifacts.require("MintNft.sol")

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(TestMinter)
  const testMinter = await TestMinter.deployed()
  testMinter.printUniqueAsset("0x2Ac95B744f4eAB40B56281Eca7b4aC8b64dfda77")
  console.log("minted!")
}
