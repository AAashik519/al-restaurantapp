 
import {Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { AnimatePresence } from 'framer-motion';
import CreateContainer from './components/CreateContainer';
import MainContainer from './components/MainContainer';
 
function App() {
  return (
    <AnimatePresence exitBeforeEnter >

   
    <div className="w-screen h-auto flex flex-col bg-primary ">
      <Header />

      <main className='mt-16 md:mt-20 px-4 md:px-16 py-4 w-full'>
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/createItem' element={<CreateContainer />} />
        </Routes>
      </main>
    </div>

    </AnimatePresence>
  );
}

export default App;
