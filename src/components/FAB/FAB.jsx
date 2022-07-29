import { useState } from "react";
import styled from "styled-components";
// import Iconify from the components folder
import Iconify from "../../components/Iconify";
// import the useRouter hook from the next/router module
import { useRouter } from "next/router";


const FAB = ({ actions }) => {
    const [open, setOpen] = useState(false);
    // use the useRouter hook to get the current route
    const router = useRouter();
    // create a function to handle the click event
    const handleClick = (action) => {
        // close the FAB
        // navigate to the action's path
        router.push("/postArtwork");
    }


    // Set open state to true if user hover over "ul" element 
    const mouseEnter = () => setOpen(true);

    // Set open state to false if user hover out of "ul" element 
    const mouseLeave = () => setOpen(false);

    return (
        <FabWrapper
            className="fab-container"
            onClick={() => handleClick()}
            // onMouseEnter={mouseEnter}
            // onMouseLeave={mouseLeave}
        >
            <Iconify size="3.6em" color="white" icon="mdi-plus" />

        </FabWrapper>
    );

};

const FabWrapper = styled.div`
position: fixed;
display: flex;
justify-content: center;
align-items: center;
right: 2em;
bottom: 2em;
height: 4.6em;
width: 4.6em;
background:black;
border-radius: 50px;
box-shadow: 0px 0px 10px rgba(0,0,0,0.8);
cursor: pointer;
`;

export default FAB;