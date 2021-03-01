require("dotenv").config()

const fs = require("fs")
const FormData = require("form-data")
const { default: axios } = require("axios")

const pinFileToIPFS = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  let data = new FormData()
  data.append("file", fs.createReadStream("./jesus.jpg"))
  const res = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.pinataApiKey,
      pinata_secret_api_key: process.env.pinataSecretApiKey,
    },
  })
  console.log(res.data)
}
pinFileToIPFS()
