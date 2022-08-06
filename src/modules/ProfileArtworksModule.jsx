import React from 'react'
import styled from 'styled-components'
import Image from "next/image"
import { resolve } from 'path'
import { useArtworks } from '../contexts/ArtworksContext'

// array of 6 icons that contains  wow fire love fire meh trash
const icons = [
    {
        name: "mindBlown",
        src: "/static/mindBlown.png",
        alt: "mindBlown",
        emoji: "😱"
    },
    {
        name: "love",
        src: "/static/love.png",
        emoji: "😍"
    },
    {
        name: "fire",
        src: "/static/fire.png",
        emoji: "🔥"
    },
    {
        name: "lol",
        src: "/static/fire.png",
        emoji: "😂"
    },
    {
        name: "meh",
        src: "/static/meh.png",
        emoji: "😐"
    },
    {
        name: "trash",
        src: "/static/trash.png",
        emoji: "🗑"
    },

]

export default function ProfileArtworksModule({ artworks }) {


    const resolveWidth = (aspectRatio) => {
        switch (aspectRatio) {
            case "landscape":
                return "62rem"
            case "square":
                return "26rem"
            case "portrait":
                return "36rem"
            default:
                break;
        }
    }

    const resolveHeight = (aspectRatio) => {
        switch (aspectRatio) {
            case "landscape":
                return "36rem"
            case "square":
                return "26rem"
            case "portrait":
                return "52rem"
            default:
                break;
        }
    }

    const ReactionsTable = ({ reactions }) => {

        // get the times that the word fire is repeated in the reactions array
        const fireCount = reactions.filter(reaction => reaction === "fire").length
        const loveCount = reactions.filter(reaction => reaction === "love").length
        const lolCount = reactions.filter(reaction => reaction === "lol").length
        const mehCount = reactions.filter(reaction => reaction === "meh").length
        const trashCount = reactions.filter(reaction => reaction === "trash").length
        const mindBlownCount = reactions.filter(reaction => reaction === "mindblown").length

        const reactionsCount = [mindBlownCount, loveCount, fireCount, lolCount, mehCount, trashCount]
        console.log(reactionsCount)





        return <Table style={{ border: "2px solid black" }}>
            <tbody >
                <tr style={{
                    borderBottom: "1px solid black"
                }}>
                    {icons.map(icon => <td key={icon.name}>{icon.emoji}</td>)}
                </tr>
                <tr>
                    {reactionsCount.map((count, i) => <td key={i}>{count}</td>)}
                </tr>
            </tbody>
        </Table>
    }



    const ProfileArtworkComponent = ({ artwork }) => {
        console.log("artwork", artwork)
        return <ArtworkWrapper>
            <div style={{ width: "20%" }}>{artwork.name}</div>
            <div style={{}}><ReactionsTable reactions={artwork.reactions} /></div>
            {/* <div style={{ height: "60%", border: "2px solid black", padding: "0.5rem 2rem", textAlign:"center" }}>

                <div>comments</div>
                <div>{0}</div>

            </div> */}
            <div style={{ position: "relative" }}>
                <Image
                    style={{ border: "2px solid black" }}
                    src={artwork.ArtworkImg ? artwork.ArtworkImg : "/assets/images/coin.png"}
                    alt={"img"}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/assets/placeholder.png"
                    height={resolveHeight(artwork.AspectRatio)}
                    width={resolveWidth(artwork.AspectRatio)}
                />
            </div>
        </ArtworkWrapper>
    }

    return artworks.map(artwork => (<ProfileArtworkComponent key={artwork.id} artwork={artwork} />))
}

const ArtworkWrapper = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height:8rem;
    border: 1px solid black;
    // padding:1rem 0.5rem;
    color: black;
    margin: 0.5rem 0rem;
`;

const Table = styled.table`

width: 20rem;
  tr {
    border-bottom: 1px solid black; 
 }
  td {
    width: 1rem;
    height: 1rem;
    // border: 1px solid black;
    text-align: center;
  }
`;
