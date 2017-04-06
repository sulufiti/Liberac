const azure = require('azure-storage')
const fs = require('fs')
const env = require('dotenv').config()
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY)

blobService.getBlobToStream('passports', 'b2b1461a-9fac-4c22-94b5-12b7b0ac2c20', fs.createWriteStream('LICENSE.txt'), (error, result, response) => {
  if (!error) {
    console.log('Retrieved blob as returntrip.gif')
  }
})

blobService.createBlockBlobFromLocalFile('passports', 'b2b1461a-9fac-4c22-94b5-12b7b0ac2c20', './LICENSE.txt', (error, result, response) => {
  if (!error) {
    console.log(result)
    console.log(response)
  }
})

blobService.createBlockBlobFromLocalFile('addressproofs', 'b2b1461a-9fac-4c22-94b5-12b7b0ac2c20', './filestoragetest.gif', (error, result, response) => {
  if (!error) {
    console.log(result)
    console.log(response)
  }
})