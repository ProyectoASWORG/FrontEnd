import { 
  BrowserRouter as Router,
  Route,
  Routes 
} from 'react-router-dom';

import NavBar from './components/NavBar';
import Contributions from './pages/contributions/Contributions';


function App() {
  return (
    <div>
      <header>
        <h1>Hacker News!</h1>
      </header>
      <body>
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Contributions/>}></Route>
          </Routes>
        </Router>
      </body>
    </div>
  );
}

export default App;
