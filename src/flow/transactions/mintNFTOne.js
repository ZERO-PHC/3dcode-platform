export const mintNFTOne = `

import ContractOne from 0x4af9662569a3c3a6
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20

transaction(_name: String, _description: String, _thumbnail: String, _type: String) {
  
    prepare(signer: AuthAccount) {
    
      //SETUP EXAMPLE NFT COLLECTION
      if signer.borrow<&ContractOne.Collection>(from: ContractOne.CollectionStoragePath) == nil {
        signer.save(<- ContractOne.createEmptyCollection(), to: ContractOne.CollectionStoragePath)
        signer.link<&ContractOne.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(ContractOne.CollectionPublicPath, target: ContractOne.CollectionStoragePath)
      }
  
      let contractCollection = signer.borrow<&ContractOne.Collection>(from: ContractOne.CollectionStoragePath)!
  
      contractCollection.deposit(token: <- ContractOne.mintNFT( 
          recipient: contractCollection,
          name: _name,
          description: _description,
          thumbnail: _thumbnail,
          type: _type))
    }
  
    execute {
      log("Minted NFT Contract One!")
    }
  }

`