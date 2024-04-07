import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<h1>temp home</h1>} />
        <Route exact path='/test' element={<h1>test</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
