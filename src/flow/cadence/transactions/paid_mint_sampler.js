export const PAID_MINT_SAMPLER = `

import Samplers from 0xDeployer
import NonFungibleToken from 0xDeployer
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import MetadataViews from 0xDeployer

transaction( name: String, description: String, thumbnail: String, type: String) {
    let RecipientCollection: &Samplers.Collection{NonFungibleToken.CollectionPublic}
    let temporaryVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {

      //SETUP EXAMPLE NFT COLLECTION
      if signer.borrow<&Samplers.Collection>(from: Samplers.CollectionStoragePath) == nil {
        signer.save(<- Samplers.createEmptyCollection(), to: Samplers.CollectionStoragePath)
        signer.link<&Samplers.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(Samplers.CollectionPublicPath, target: Samplers.CollectionStoragePath)
      }

      self.RecipientCollection = signer.getCapability(Samplers.CollectionPublicPath)
                                  .borrow<&Samplers.Collection{NonFungibleToken.CollectionPublic}>()!
    
      let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow owner''s Vault reference")
      
      var price = 0.0
      switch type {
        case "common" as String:
          price = UFix64(10)
        case "rare" as String:
          price = UFix64(30)
        case "legendary" as String:
          price = UFix64(50)
      }

      self.temporaryVault <- vaultRef.withdraw(amount: price)  
    }
    
    
    execute {
      
      let sellerCap = getAccount(0xDeployer).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
      let seller = sellerCap.borrow()!
      seller.deposit(from: <- self.temporaryVault)

      Samplers.mintNFT(recipient: self.RecipientCollection, name: name, description: description, thumbnail: thumbnail, type: type)
    }
  }
`;
