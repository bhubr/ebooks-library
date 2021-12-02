import Home from './Home';

function App() {
  if(window.location.search.includes('code')) return <p>login&hellip;</p>
  return (
    <Home />
  );
}

export default App;
