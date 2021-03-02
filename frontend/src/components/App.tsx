import React, { useEffect, useState } from "react"
import { Contract, ethers } from "ethers"
import EvolutionCharacters from "../contracts/MintNft.json"

declare global {
  interface Window {
    ethereum: any
    cleanEthereum: any
  }
}

const App = () => {
  const [contract, setContract] = useState<Contract>()
  const [account, setAccount] = useState<ethers.providers.JsonRpcSigner>()

  const address = "0xC84148e516643559A9e3DbF015058088806f47C1"

  useEffect(() => {
    const init = async () => {
      await window.ethereum.enable()

      // const provider = new ethers.providers.JsonRpcProvider(
      //   "http://localhost:8545"
      // )

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      const signerAddress = await signer.getAddress()

      const nftContract = new Contract(
        address,
        EvolutionCharacters.abi,
        provider
      )

      setContract(nftContract)
      setAccount(signer)
    }
    init()
  }, [])

  return <div>hi</div>
}

export default App
