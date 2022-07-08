export const getSamplersScript = `

  import Samplers from 0xDeployer
  import MetadataViews from 0xDeployer

  pub fun main(address: Address): [Samplers.NFTMetaData] {
    let collection = getAccount(address).getCapability(Samplers.CollectionPublicPath)
                      .borrow<&Samplers.Collection{MetadataViews.ResolverCollection}>()
                      ?? panic("Could not borrow a reference to the nft collection")

    let ids = collection.getIDs()

    let answer: [Samplers.NFTMetaData] = []

    for id in ids {
      
      let nft = collection.borrowViewResolver(id: id)
      let view = nft.resolveView(Type<Samplers.NFTMetaData>())!

      let display = view as! Samplers.NFTMetaData
      answer.append(display)
    }
     
    return answer
  }
`