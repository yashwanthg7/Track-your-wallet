import "./App.css";
import styled from 'styled-components';
import { MainLayout } from "./styles/Layouts";
import Graph from "./Components/Graph";

const Container = styled.div`
  max-width: 6xl;
  margin-left: auto;
  margin-right: auto;
  /* text-center: center; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #333333;
`;

const Heading = styled.h1`
  font-size: 40px;
  padding-top: 8px;
  margin-bottom: 10px;
  background-color: #1F2937;
  color: #FFFFFF;
  border-radius: 4px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
function App() {
  return (
    <div className="App">
      <Container>
        <Heading>Track Your Wallet</Heading>
      </Container>
      <Graph>
      </Graph>
    </div>
  );
}

export default App;
