const MintNft = artifacts.require("MintNft")

contract("MintNft", (accounts) => {
  before(async () => {
    mintNft = await MintNft.deployed()
  })

  it("should mint nfts", async () => {
    await mintNft.printUniqueAsset(
      "0x2Ac95B744f4eAB40B56281Eca7b4aC8b64dfda77",
      "hihihihihi"
    )
    assert(mintNft.tokenId == 1)
  })

  it("should return url", async () => {
    const res = await mintNft.getTokenURI(1)
    assert(res === "hihihihihi")
  })
})
