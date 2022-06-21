import React from "react";
import { useNFTs } from "../contexts/NftsContext";
import Tab from "../modules/Tab";

const Tabs = ({rarities}) => {
    const { SelectedRarity } = useNFTs()

    return (
        <section
        style={{
        position: "absolute",
        width: "16%",
        display: "flex",
        justifyContent:"space-between",
        left: "50%",
        transform: "translate(-50%, -50%)",
        }}
        >
        {rarities.map((rarity,i) => (
        <Tab key={i} label={rarity.label} img={rarity.label === SelectedRarity ? rarity.activeImg : rarity.inactiveImg} />
        ))}
        </section>
    )
}
export default Tabs