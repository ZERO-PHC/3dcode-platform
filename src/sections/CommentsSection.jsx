import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentComponent from '../components/CommentComponent';
import Iconify from '../components/Iconify';

export default function CommentsSection() {
  return (
    <main
      style={{
        height: "100%",
        width: "30%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10rem",
      }}
    >

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          height: "100%",
          justifyContent: "end",
          marginBottom: "6rem",
          alignItems: "center",
          position: "relative",
        }}
      >

        <CommentsWrapper>
          <PromptOverlay>
            <section style={{ top: "3px", right: "10px", height: "20%", paddingLeft: "0.5rem", width:"100%", display:"flex", flexDirection:"column", alignItems:"end" }}>
              <ReactionsTitle>
                <div>
                COMMENTS
                  </div>

              {/* <Underline /> */}
              </ReactionsTitle>
            </section>
          </PromptOverlay>
          <main
            style={{ width: "100%", height: "40%" }}
            className="comments-section"
          >
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
          </main>
        </CommentsWrapper>
        <InputWrapper>
          <input placeholder='Something cool' />
          <main  className='send-btn'>
            <Iconify icon='fa-send' color="white" />
          </main>
        </InputWrapper>
      </section>
    </main>)
}


const CommentsWrapper = styled.section`
            position:relative;
            height: 60%;
            max-height: 60%;
            width: 100%;
            background: rgba(130, 132, 135, 0.18);
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: end;
            justify-content: start;
            color: white;
            overflow: scroll;
            overflow-x: hidden;
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

  .send-btn  {
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
  text-align: right;
  width: 100%;
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
`;

const Underline = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: white;
  transform: skewX(-20deg);
  right: 0px;
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
  background: linear-gradient(180deg, black 10%, rgba(130, 132, 135, 0) 100%);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;