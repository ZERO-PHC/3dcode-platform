import { useState } from "react";
import { MintCodes } from "../codeSnippets/MintCodes";
import EducationalBox from "./EducationalBox";

import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import { useAnimation } from "../contexts/animation/AnimationContext";

const LearnMintComp = ({ setLearnMintComp }) => {
  const [level, setLevel] = useState(0);
  const { handleCompletedLevel } = useAnimation();

  const oneMore = () => {
    handleCompletedLevel(level + 2);
    if (level != 6) setLevel(level + 1);
  };

  const lessOne = () => {
    handleCompletedLevel(level - 2);
    if (level != 0) setLevel(level - 1);
  };

  return (
    <Wrapper>
      <Header>
        <button onClick={() => setLearnMintComp(false)}>x</button>
        <h1>How can you make this page?</h1>
      </Header>
      <Main>
        <section>
          {level == 0 && (
            <>
              <EducationalBox
                title="Create a new Context to call transactions and scripts to the Flow Blockchain"
                subtitle="Create a new folder inside /contexts/NftsContext.js"
                content="Inside of it import FCL and the useAuth from /AuthContext.js"
                codeSnippet={MintCodes.NftsContext}
              />
            </>
          )}

          {level == 1 && (
            <EducationalBox
              title="Now we will import and use this new context in our application"
              subtitle="Inside of /pages/_app.js import the new NftsContext"
              codeSnippet={MintCodes.appJsNftsContext}
            />
          )}

          {level == 2 && (
            <EducationalBox
              title="Get back to you NftsContext.js file"
              subtitle="Inside of it we will create some states to handle with the NFTs"
              codeSnippet={MintCodes.StatesNFTs}
            />
          )}

          {level == 3 && (
            <EducationalBox
              title="Create a folder with your scripts"
              subtitle="Inside your flow folder create /flow/cadence/scripts"
              content="Inside of it create a file get_samplers.js"
              codeSnippet={MintCodes.ScriptSampler}
            />
          )}

          {level == 4 && (
            <EducationalBox
              title="Create a folder with your transactions"
              subtitle="Inside your flow folder create /flow/cadence/transactions"
              content="Inside of it create a file mint_sampler.js"
              codeSnippet={MintCodes.TransactionSampler}
            />
          )}

          {level == 5 && (
            <EducationalBox
              title="Now we can add the functions that will get the NFTs and mint the NFTs"
              subtitle="Import the script and transactions (created in the “todo → cadenceApp”)"
              content="We will export them inside our values object"
              codeSnippet={MintCodes.FuctionsNFTs}
            />
          )}

          {level == 6 && (
            <EducationalBox
              title="Inside your page/component where you will mint and show the nfts that the address has:"
              subtitle="Import the NftsContext "
              codeSnippet={MintCodes.ComponentMintNFTs}
            />
          )}
          <box>
            <p onClick={() => lessOne()}> before </p>
            <ProgressBar />
            <p onClick={() => oneMore()}> next </p>
          </box>
        </section>
      </Main>
    </Wrapper>
  );
};

export default LearnMintComp;

const Header = styled.header`
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  section {
    width: 100% !important;
    padding: 14px 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;

    > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      height: 60vh;
      margin: 30px;
      padding: 20px;
      text-align: center;
      border: 1px solid white;
      overflow-y: overlay;
    }
  }
  pre,
  code,
  textarea,
  kbd,
  samp,
  tt {
    width: 90%;
    overflow: hidden !important;
    font-size: 14px !important;
  }
  div {
    h2 {
      font-size: 17px;
    }

    h3 {
      font-size: 12px;
    }

    p {
      font-size: 10px;
      margin: 20px 30px;
    }
  }
`;

const Wrapper = styled.main`
  background-color: #732190 !important;
  height: 86vh !important;
  max-width: 90% !important;
  width: 90% !important;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);

  button {
    position: absolute;
    top: -1px;
    right: 35px;
    padding: 10px 20px;
    background: black;
    color: white;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }

  box {
    display: flex;
    justify-content: center;
    gap: 40px;

    p {
      padding: 10px 20px;
      border: 1px solid white;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
