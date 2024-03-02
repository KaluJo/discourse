import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

import { ChakraProvider } from '@chakra-ui/react'
import Main from './components/Main';

function App() {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  );
}

export default App;
