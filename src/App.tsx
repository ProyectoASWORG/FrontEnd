import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Routes 
} from 'react-router-dom';

import NavBar from './components/NavBar';
import { AuthContext } from './context/auth/context';
import { authReducer, loggedIn } from './context/auth/reducer';
import { initialState } from './context/auth/state';
import { jwtInterceptor } from './interceptors/jwtInterceptor';
import { User } from './models/User';
import Contributions from './pages/contributions/Contributions';
import auth_service from './services/auth_service';
import styled from 'styled-components';
import { FilterType } from './enums/FilterType';

const Body = styled.body`
  margin: 1em;
`
const Container = styled.div`
  padding: 1em;
  background-color: #f6f6ef;
`

function App() {

  jwtInterceptor();

  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(()=>{
    dispatch(loggedIn());
  },[])
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <Body>
        <Router>
          <NavBar></NavBar>
          <Container>
            <Routes>
                <Route path="/" element={<Contributions type={FilterType.URL}/>}></Route>
                <Route path="/news" element={<Contributions type={FilterType.NEWS}/>}></Route>
                <Route path="/ask" element={<Contributions type={FilterType.ASK}/>}></Route>
            </Routes>
          </Container>
        </Router>
      </Body>
    </AuthContext.Provider>
  );
}

export default App;
