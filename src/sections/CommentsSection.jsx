import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Spinner from '../atoms/Spinner';
import CommentComponent from '../components/CommentComponent';
import Iconify from '../components/Iconify';
import PrimaryBtnComponent from '../components/PrimaryBtn';
import { useArtworks } from '../contexts/ArtworksContext';

export default function CommentsSection({ comments, handleCommentPost, handleKeyboardPost, Comment, handleCommentChange, Loading, animation }) {
  const { handleAddProduct } = useArtworks()

  console.log(comments);
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
        position: "relative",
      }}
    >

      <CommentsWrapper style={animation}>
        <TopComponent>
          <ReactionsTitle>
            DETAILS
            <div className='underline'></div>
          </ReactionsTitle>

        </TopComponent>
        <BottomComponent>
         

          <AddButtonComponent>
            <PrimaryBtnComponent label={"5 USD"} onClick={handleAddProduct} />
          </AddButtonComponent>
        </BottomComponent>

      </CommentsWrapper>

    </section>
  )
}

const commentsAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
  `;

const PriceComponent = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(130, 132, 135, 0.18);
  background-filter: blur(0.5rem);
  border-top: 1px solid rgba(130, 132, 135, 0.18);
  animation: ${commentsAnimation} 1.6s ease-out;
  border-bottom-left-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;

  .send-btn  {
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
    background: rgba(130, 132, 135, 0.18);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }

`

const AddButtonComponent = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
 
  animation: ${commentsAnimation} 1.6s ease-out;
  border-bottom-left-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;

  .add-btn  {
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
    background: rgba(130, 132, 135, 0.18);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }
  `

const TopComponent = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: start;
  animation: ${commentsAnimation} 1.6s ease-out;
  border-bottom-left-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;

  .send-btn  {
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
    background: rgba(130, 132, 135, 0.18);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  input {
    padding: 0rem 0.5rem;
    margin: 0;
    width: 80%;
    height: 60%;
    // border: 2px solid #b6b6b6;
    border: none;
    border-radius: 12px;
    font-family: "Monument", sans-serif;
    font-size: 1rem;
    text-align: left;
    background-color: rgba(130, 132, 135, 0.18);
    color: white;
    text-shadow: 0 0 0.1rem #000;
    &:focus {
      outline: none;
      border: 2px solid white;
    }
  }
`;

const BottomComponent = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  border-top: 1px solid rgba(130, 132, 135, 0.18);
  animation: ${commentsAnimation} 1.6s ease-out;
  border-bottom-left-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;

  .send-btn  {
    cursor: pointer;
    width: 2.4


  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
  `;

const CommentsWrapper = styled.div`
            position:relative;
            height: 60%;
            max-height: 60%;
            width: 60%;
            border-radius: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: start;
            border: 1px solid rgba(130, 132, 135, 0.18);
            overflow: scroll;
            overflow-x: hidden;
            animation: ${commentsAnimation} 1.6s ease-out;
            ::-webkit-scrollbar {
              width: 0rem;
              background: rgba(130, 132, 135, 0.23);
          
            }
            `


// styled component width 100 % height 100 % display flex flex direction column align items center justify content center margin top 10 rem
const InputWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(130, 132, 135, 0.18);
  background-filter: blur(0.5rem);
  border-top: 1px solid rgba(130, 132, 135, 0.18);
  animation: ${commentsAnimation} 1.6s ease-out;
  border-bottom-left-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;

  .send-btn  {
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
    background: rgba(130, 132, 135, 0.18);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  input {
    padding: 0rem 0.5rem;
    margin: 0;
    width: 80%;
    height: 60%;
    // border: 2px solid #b6b6b6;
    border: none;
    border-radius: 12px;
    font-family: "Monument", sans-serif;
    font-size: 1rem;
    text-align: left;
    background-color: rgba(130, 132, 135, 0.18);
    color: white;
    text-shadow: 0 0 0.1rem #000;
    &:focus {
      outline: none;
      border: 2px solid white;
    }
  }
`;



const ReactionsTitle = styled.h1`
  font-family: "Monument", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1rem;
  margin:1rem 0.6rem;
  text-align: left;
  width: 30%;
  height: 10%;
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

  .underline {
    position: absolute
    width: 10px;
    height: 0.2rem;
    background-color: rgba(0, 0, 0, 0.2);
    transform: skewX(-20deg);
    right: 0px;
  }
`;

const Underline = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: white;
  transform: skewX(-20deg);
  @media (max-width: 768px) {
    width: 50%;
    height: 0.5rem;
    background-color: white;
    transform: skewX(-20deg);
  }
  @media (max-width: 480px) {
    width: 50%;
    height: 0.3rem;
    background-color: white;
    transform: skewX(-20deg);
  }
`;




const PromptOverlay = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1;
  width: 100%;
  height: 20%;
  background: black;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;