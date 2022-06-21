export const getSamplersScript = `

  import Samplers from 0xDeployer
  import MetadataViews from 0xDeployer

  pub fun main(address: Address): [NFT] {
    let collection = getAccount(address).getCapability(Samplers.CollectionPublicPath)
                      .borrow<&Samplers.Collection{MetadataViews.ResolverCollection}>()
                      ?? panic("Could not borrow a reference to the nft collection")

    let ids = collection.getIDs()

    let answer: [NFT] = []

    for id in ids {
      
      // Get the basic display information for this NFT
      let nft = collection.borrowViewResolver(id: id)

      // Get the basic display information for this NFT
      let view = nft.resolveView(Type<Samplers.NFTMetaData>())!

      let display = view as! Samplers.NFTMetaData

      answer.append(
        NFT(
          id: id, 
          name: display.name, 
          description: display.description, 
          thumbnail: display.thumbnail,
          type: display.type
        )
      )
    }

    return answer
  }

  pub struct NFT {
    pub let id: UInt64
    pub let name: String 
    pub let description: String 
    pub let thumbnail: String
    pub let type: String
    
    init(id: UInt64, name: String, description: String, thumbnail: String, type: String) {
      self.id = id
      self.name = name 
      self.description = description
      self.thumbnail = thumbnail
      self.type = type
    }
  }
`