import React from "react";
import styled from "styled-components";

const BackgroundContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  background-color: white;
`;

const BitstampContainer = styled.div`
  display: flex;
  flex: 1;
  border-right: 1px solid gray;
`;

const CoinbaseContainer = styled.div`
  display: flex;
  flex: 1;
`;

export function App() {
  return (
    <BackgroundContainer>
      <BitstampContainer></BitstampContainer>
      <CoinbaseContainer></CoinbaseContainer>
    </BackgroundContainer>
  );
}

export default App;
