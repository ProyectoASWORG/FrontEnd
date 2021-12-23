import React, {  useEffect, useReducer } from 'react';
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
import Contributions from './pages/contributions/Contributions';
import SubmitContribution from './pages/contributions/Components/SubmitContribution'
import styled from 'styled-components';
import { FilterType } from './enums/FilterType';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import contributionReducer from './redux/contributions/contributionReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { masterReducer } from './redux/reducers';
import Users from './pages/users/Users';
import Comments from './pages/comments/Comments';
import DetailedContribution from './pages/comments/DetailedContribution';
import CommentReply from './pages/comments/Components/commentReply';

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

  const store = createStore(masterReducer, composeWithDevTools(applyMiddleware(thunk)));

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{state, dispatch}}>
        <Body>
          <Router>
            <NavBar></NavBar>
            <Container>
              <Routes>
                  <Route path="/" element={<Contributions type={FilterType.URL}/>}></Route>
                  <Route path="/news" element={<Contributions type={FilterType.NEWS}/>}></Route>
                  <Route path="/ask" element={<Contributions type={FilterType.ASK}/>}></Route>
                  <Route path="/upvotedContributions" element={<Contributions type={FilterType.UPVOTEDCONTRIBUTIONS}/>}></Route>
                  <Route path='/submit' element={<SubmitContribution/>}></Route>
                  <Route path="/user/:id" element={<Users/>}></Route>
                  <Route path="/threads/:id" element={<Comments type={FilterType.USERCOMMENTS}/>}></Route>
                  <Route path= "/detailedCon/:id" element={<DetailedContribution/>}></Route>
                  <Route path="/reply/:id/:contributionId/:nombre/:texto/:created_at" element={<CommentReply/>}></Route>
                  <Route path="/upvotedComments/:id" element={<Comments type={FilterType.UPVOTEDCOMMENTS}/>}></Route>
                  <Route path="/userContributions" element={<Contributions type={FilterType.UPVOTEDCONTRIBUTIONS}/>}></Route>


              </Routes>
            </Container>
          </Router>
        </Body>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;


