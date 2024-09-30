import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.main`
  /* background-color: orangered; */
  padding: 20px;
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>
            <div>
              <Heading as='h2'>Check in Check out</Heading>

              <Button onClick={() => alert('Check in')}>Chenk In</Button>
              <Button onClick={() => alert('check out')}>Check out</Button>
            </div>
          </Row>
          <Row>
            <Heading as='h3'>Form</Heading>
            <form>
              <Input
                type='number'
                placeholder='Number of guest'
              />
              <Input
                type='number'
                placeholder='Number of guests'
              />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
