import React, { useEffect, useState } from "react"
import { Contract, ethers } from "ethers"
import axios from "axios"
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
  const [imgSource, setImageSouce] = useState<string>("")

  const address = "0x41988fd586A347A0d01e59e6C931355CE6b1bD2e"

  useEffect(() => {
    const init = async () => {
      await window.ethereum.enable()

      // const provider = new ethers.providers.JsonRpcProvider(
      //   "http://localhost:8545"
      // )

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      const signerAddress = await signer.getAddress()

      const nftContract = new Contract(address, EvolutionCharacters.abi, signer)

      setContract(nftContract)
      setAccount(signer)
    }
    init()
  }, [])

  useEffect(() => {}, [imgSource])

  const mintNft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (contract) {
      contract.printUniqueAsset(
        "0x2Ac95B744f4eAB40B56281Eca7b4aC8b64dfda77",
        "ipfs://QmfTBhd9vKF5D2Ra2uELEXiFEUoVuLkxxU9XhZu2xcGX47"
      )
    }
  }

  const feed = async () => {
    if (contract) {
      contract.feedNft(2)
      let characterInfo = await contract.character(2)

      if (characterInfo.level == 2) {
        const newRes: any = await axios.get(
          "https://gateway.pinata.cloud/ipfs/QmfTBhd9vKF5D2Ra2uELEXiFEUoVuLkxxU9XhZu2xcGX47"
        )
        setImageSouce(newRes.data.image2)
        alert("Your NFT is now level 2!")
      }
      if (characterInfo.level == 3) {
        const newRes: any = await axios.get(
          "https://gateway.pinata.cloud/ipfs/QmfTBhd9vKF5D2Ra2uELEXiFEUoVuLkxxU9XhZu2xcGX47"
        )
        setImageSouce(newRes.data.image3)
        alert("Your NFT is now level 3!")
      }
    }
  }

  const assignMetadata = () => {}

  const returnMetadata = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (contract) {
      //const res = await contract.getTokenURI(0)
      let characterInfo = await contract.character(2)

      if (characterInfo.level == 1) {
        const newRes: any = await axios.get(
          "https://gateway.pinata.cloud/ipfs/QmfTBhd9vKF5D2Ra2uELEXiFEUoVuLkxxU9XhZu2xcGX47"
        )
        setImageSouce(newRes.data.image)
      }

      if (characterInfo.level == 2) {
        const newRes: any = await axios.get(
          "https://gateway.pinata.cloud/ipfs/QmfTBhd9vKF5D2Ra2uELEXiFEUoVuLkxxU9XhZu2xcGX47"
        )
        setImageSouce(newRes.data.image2)
      }
      if (characterInfo.level == 3) {
        const newRes: any = await axios.get(
          "https://gateway.pinata.cloud/ipfs/QmfTBhd9vKF5D2Ra2uELEXiFEUoVuLkxxU9XhZu2xcGX47"
        )
        setImageSouce(newRes.data.image3)
      }
      // const newRes: any = await axios.get(
      //   "https://gateway.pinata.cloud/ipfs/QmfTBhd9vKF5D2Ra2uELEXiFEUoVuLkxxU9XhZu2xcGX47"
      // )
      // console.log(newRes.data)
      // setImageSouce(newRes.data.image)
    }
  }

  return (
    <div>
      <button onClick={mintNft}>Mint Nft</button>
      <button onClick={returnMetadata}>Get URL</button>
      <button onClick={feed}>Feed</button>
      <img src={imgSource} />
    </div>
  )
}

export default App
