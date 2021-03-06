require("dotenv").config()
const path = require("path")

const HDWalletProvider = require("@truffle/hdwallet-provider")
const infuraKey = process.env.INFURA_SECRET

module.exports = {
  compilers: {
    solc: {
      version: "0.7.5", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },

  contracts_build_directory: path.join(__dirname, "frontend/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },

    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.WALLET_PRIVATE_KEY,
          process.env.ALCHEMY_URL
        ),
      network_id: 4, // Ropsten's id
      gas: 4600000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
}
