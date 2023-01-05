import React from 'react';
import styled from 'styled-components';
import { Icon, InlineIcon } from '@iconify/react';

const SearchbarContainer = styled.div`
  border: 2px solid black;
  background-color: transparent;
  border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: start;
`;

const SearchbarInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  width: 75%;
  background-color: transparent;
  height: 100%;
  font-family: Monument, sans-serif;
  color: lightgrey;
  text-transform: uppercase;
  opacity: 0.7;
`;

const SearchbarButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

const SearchIcon = () => (
    <Icon
        icon="carbon:search"
        style={{ color: 'black', fontSize: '24px' }}
    />
);

const SearchbarComponent = () => {
  return (
    <SearchbarContainer>
        <SearchbarButton>
        <SearchIcon />
      </SearchbarButton>
      <SearchbarInput type="text" placeholder="Search..." />
      
    </SearchbarContainer>
  );
};

export default SearchbarComponent;
