import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Book from './Book';

function App() {
  if(window.location.search.includes('code')) return <p>login&hellip;</p>
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:slug" element={<Book />} />
    </Routes>
  );
}

export default App;
