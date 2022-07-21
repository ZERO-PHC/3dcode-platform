import Image from "next/image";
import React, { useEffect } from "react";
import styled from "styled-components";
import Iconify from "../../components/Iconify";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useNFTs } from "../../contexts/NftsContext";
//import the TransactionComponent from the components folder
import TransactionComponent from "../../components/TransactionComponent";
// import the artworks.js file from the src folder
import { artworks } from "../../artworks.js";
// import the useParams function from the next/router library
import { useRouter } from "next/router";
import ArtworkPrompt from "../../components/ArtworkPrompt";
import ArtgridComponent from "../../components/ArtgridComponent";
// create a img styled component  called ArtworkBackground that has a blurred  image
const ArtworkBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  object-fit: cover;
`;

const ArtworkContainer = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // padding: 2rem;
  align-items: left;
  height: 40rem;
  width: 40rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    height: auto;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 40rem;
    width: 40rem;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    height: 40rem;
    width: 40rem;
    background-size: cover;

    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 40rem;
    width: 40rem;
    position: relative;
    overflow: hidden;
  }
`;

// create the underline component that has a white skewed rectangle that is 40% of the width of the artwork container
const Underline = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: white;
  transform: skewX(-20deg);
  left: 0;
  @media (max-width: 768px) {
    width: 100%;
    height: 0.5rem;
    background-color: white;
    transform: skewX(-20deg);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 0.5rem;
    background-color: white;
    transform: skewX(-20deg);
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

// create a styled component called ArtworkTitle that has a font size of 3rem and a font weight of bold a text align of left a width of 100 a height of 30%
const ArtworkTitle = styled.h1`
  font-family: "MonumentBold", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  height: 20%;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    height: 30%;
  }
  @media (max-width: 480px) {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    height: 30%;
  }
`;

// create header component that has a row
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 10%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
  }
`;

// create a component called BackButton that has a white background a border radius us 50 px and a center alignment
const BackButton = styled.div`
  background-color: black;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  height: 2rem;
  width: 2rem;
  border: 2px solid #b6b6b6;
  padding: 0.5rem;
  @media (max-width: 768px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
`;

// create a component called BuyBtnContainer that has a height of 30% and a width of 100% a center alignment and a display flex
const BuyBtnContainer = styled.div`
  position: absolute;
  bottom: -2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30%;
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
  }
`;

// create a component called BuyBtn that has a white background a border radius us 50 px and a center alignment
const BuyBtn = styled.div`
  display: flex;
  position: relative;
  background-color: black;
  border-radius: 50px;
  align-items: center;
  justify-content: start;
  padding-left: 0.8rem;
  font-size: 1.5rem;
  font-weight: bold;
  height: 2.6rem;
  width: 12rem;
  border: 2px solid #b6b6b6;
  // padding-: 0.5rem;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
`;
// create PromptContainer component that has a 50% height text align to left
const PromptContainer = styled.div`
  height: 20%;
  width: 100%;
  text-align: left;
  border-radius: 50px;
  @media (max-width: 768px) {
    height: 50%;
    text-align: left;
    background-color: white;
    border-radius: 50px;
  }
  @media (max-width: 480px) {
    height: 50%;
    text-align: left;
    background-color: white;
    border-radius: 50px;
  }
`;

// create a component called FlowPriceContainer that has a white background a border radius us 50 px a border of 2px solid #b6b6b6 color black and a position absolute a top of 0 a left of 0 a width of 100% a height of 30%
const FlowPriceContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  padding-left: 0.6rem;
  width: 54%;
  height: 100%;
  background-color: white;
  border-radius: 50px;
  color: black;
  border: 1px solid #b6b6b6;
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: white;
    border-radius: 50px;
    border: 2px solid #b6b6b6;
  }
  @media (max-width: 480px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: white;
    border-radius: 50px;
    border: 2px solid #b6b6b6;
  }
`;

// create a function that return a left arrow chevron icon from the react iconify library

// create a function that returns null called FlowLogo
const Logo = () => {
  return <Image layout="fill" src="/Logo.png" />;
};

export default function ArtworkDetails() {
  const { mintSampler } = useNFTs();
  const { user } = useAuth();
  const router = useRouter();
  const [Name, setName] = React.useState();

  // store the params of the route in a variable called id
  const { artworkId } = router.query;

  useEffect(() => {
    console.log("artworkId", typeof artworkId);
    setName(artworks[artworkId].title.toUpperCase());
  });

  function getId() {
    const intId = parseInt(artworkId);
    const incrementedId = intId + 1;
    const int = incrementedId.toString();
    console.log("int", int);
    return int;
  }

  // create a styled component called VariationsWrapper that aligns all the items to the left side and has a width of 100% and a height of 20%
  const VariationsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 80%;
    height: 10%;
    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 20%;
    }
    @media (max-width: 480px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 20%;
    }
  `;

  // create a styled component called ArtworkDetailsWrapper that has a width of 40% a max--width of 40% and a black gradient background color from left to right
  const ArtworkDetailsWrapper = styled.div`
    padding: 2rem;
    height: 100%;
    width: 40%;
    max-width: 40%;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    );
    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
    }
    @media (max-width: 480px) {
      width: 100%;
      max-width: 100%;
    }
  `;

  return (
    <MainWrapper>
      <Navbar />
      <Image
        style={{ filter: "blur(12px)" }}
        src={`/artwork/artwork-${getId()}.png`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <TransactionComponent />
      <ArtworkContainer src={`/artwork/artwork-${getId()}.png`}>
        <ArtworkDetailsWrapper>
          <Header>
            <ArtworkTitle>
              {Name}
              <Underline />
            </ArtworkTitle>
            {/* <BackButton>
            <Iconify icon="fa-solid:chevron-left" />
          </BackButton> */}
          </Header>
          <PromptContainer>
            {/* <ArtworkTitle>
              <ArtworkPrompt prompt={"PROMPT"} />
              <Underline /> */}
            {/* </ArtworkTitle> */}
            <div style={{ fontSize: "0.9rem" }}>
              Buy this Artwork to unlock the prompt and variations
            </div>
          </PromptContainer>

          <VariationsWrapper>
            {/* <ArtworkTitle>
              <ArtworkPrompt prompt={"VARIATIONS"} />
              <Underline />
            </ArtworkTitle> */}
            <div style={{ marginLeft: "3rem", marginTop: "1rem" }}>
              <ArtgridComponent
                artworks={artworks}
                currentWrapper={"details"}
                // handleArtworkSelection={handleArtworkSelection}
                columns={"2"}
                artworkId={artworkId}
              />
            </div>
          </VariationsWrapper>
        </ArtworkDetailsWrapper>

        <BuyBtnContainer>
          <BuyBtn
            onClick={() =>
              mintSampler(
                "name",
                "description",
                "thumbnail",
                "type",
                user?.addr
              )
            }
          >
            BUY
            <FlowPriceContainer>
              33
              <div style={{ height: "2.6rem", width:"2.6rem", position:"relative", border:"2px solid #b6b6b6", borderRadius:"50px", marginRight:"-0.1rem" }}>
                <Logo />
              </div>
            </FlowPriceContainer>
          </BuyBtn>
        </BuyBtnContainer>
      </ArtworkContainer>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0;
`;
