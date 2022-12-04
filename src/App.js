import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './components/About';
import Home from './components/Home';
import Error from './components/Error'
import SharedLayout from './components/SharedLayout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SharedLayout></SharedLayout>}>
        <Route index element={<Home/>} />
        <Route path='about' element={<About/>} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
