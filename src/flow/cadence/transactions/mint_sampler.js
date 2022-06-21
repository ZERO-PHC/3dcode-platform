export const MINT_SAMPLER = `

import Samplers from 0xDeployer
import NonFungibleToken from 0xDeployer
import MetadataViews from 0xDeployer

transaction(name: String, description: String, thumbnail: String, type: String) {
    let RecipientCollection: &Samplers.Collection{NonFungibleToken.CollectionPublic}

    prepare(signer: AuthAccount) {

    //SETUP EXAMPLE NFT COLLECTION
    if signer.borrow<&Samplers.Collection>(from: Samplers.CollectionStoragePath) == nil {
      signer.save(<- Samplers.createEmptyCollection(), to: Samplers.CollectionStoragePath)
      signer.link<&Samplers.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(Samplers.CollectionPublicPath, target: Samplers.CollectionStoragePath)
    }

    self.RecipientCollection = signer.getCapability(Samplers.CollectionPublicPath)
                                .borrow<&Samplers.Collection{NonFungibleToken.CollectionPublic}>()!
    }

    execute {
      Samplers.mintNFT(recipient: self.RecipientCollection, name: name, description: description, thumbnail: thumbnail, type: type)
    }
  }
`;
