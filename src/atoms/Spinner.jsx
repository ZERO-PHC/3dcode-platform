import React from "react";
import styled from 'styled-components';

export default function Spinner() {
  return (
    <Wrapper >
        <div id="loading">

        </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`

display:flex;
width:100%;
jusfify-content:center;
align-items:center;

#loading {
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  
`;
