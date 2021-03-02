const TestMinter = artifacts.require("MintNft.sol")

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(TestMinter)
  const testMinter = await TestMinter.deployed()
}
