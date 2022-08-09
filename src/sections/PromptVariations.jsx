// import React from 'react'
// import styled from 'styled-components';
// import ArtgridComponent from '../components/ArtgridComponent';
// import { animated } from 'react-spring';


// export default function PromptVariations({ variationsRef, Variations, handleArtworkSelection, artworkId, IsOwner, variationsAnimation }) {
//     return (
//         <VariationsWrapper>
//             <VariationsContainer style={variationsAnimation}>
//                 <div style={{ paddingLeft: "1rem" }}>
//                     <ArtworkTitle>
//                         {"VARIATIONS"}
//                         <Underline />
//                     </ArtworkTitle>
//                 </div>

//                 <div
//                     ref={variationsRef}
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         height: "100%",
//                     }}
//                 >
//                     <ArtgridComponent
//                         variations={Variations}
//                         currentWrapper={"details"}
//                         handleArtworkSelection={handleArtworkSelection}
//                         columns={"2"}
//                         artworkId={artworkId}
//                         isOwner={IsOwner}
//                     />
//                 </div>
//             </VariationsContainer>
//         </VariationsWrapper>)
// }

// const VariationsContainer = styled(animated.div)`
//   background: rgba(130, 132, 135, 0.23);
//   padding: 0rem 0rem;
//   width: 60%;
//   height: 100%;
//   color: white;
//   border-radius: 0.5rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: start;

//   @media (max-width: 768px) {
//     display: flex;
    
//     width: 80%;
//   }
//   @media (max-width: 480px) {
   
//     width: 80%;
//   }
// `;

// const VariationsWrapper = styled.div`
//   curson: pointer;
//   margin-bottom: 3rem;
//   display: flex;
//   flex-direction: column;
//   z-index: 0;
//   align-items: center;
//   width: 40%;
//   height: 60%;
//   @media (max-width: 768px) {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     height: 20%;
//   }
//   @media (max-width: 480px) {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     height: 20%;
//   }
// `;

// const Underline = styled.div`
//   width: 20%;
//   height: 0.2rem;
//   background-color: white;
//   transform: skewX(-20deg);
//   left: 0;
//   @media (max-width: 768px) {
//     width: 50%;
//     height: 0.5rem;
//     background-color: white;
//     transform: skewX(-20deg);
    
//   }
//   @media (max-width: 480px) {
//     width: 50%;
//     height: 0.3rem;
//     background-color: white;
//     transform: skewX(-20deg);
    
//   }
// `;



// const ArtworkTitle = styled.h1`
//   font-family: "Monument", sans-serif;
//   letter-spacing: 0.1rem;
//   position: relative;
//   font-size: 1.2rem;
//   text-align: left;
//   width: 100%;
//   height: 10%;
//   @media (max-width: 768px) {
//     font-size: 1.6rem;
//     font-weight: bold;
//     text-align: left;
//     width: 100%;
//     height: 30%;
//   }
//   @media (max-width: 480px) {
//     font-size: 1.4rem;
//     font-weight: bold;
//     text-align: left;
//     width: 100%;
//     height: 30%;
//   }
// `;
