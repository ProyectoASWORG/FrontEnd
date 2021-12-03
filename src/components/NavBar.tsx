import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { GoogleResponse } from '../models/GoogleResponse';
import { AuthContext } from '../context/auth/context';
import env from 'react-dotenv';
import auth_service from '../services/auth_service';
import { loginUserWithGoogle, logOut } from '../context/auth/reducer';
import { User } from '../models/User';
import './navbar.css';
import logo from '../assets/images/logo.gif';

const Ul = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-bottom:0px;
    padding: 0px;
`
const NavItem = styled.div`
    display: flex;
    & li {
        margin:0px;
        padding: 5px 15px 5px 15px;
        border-left: 1px solid black;
    }

    & li: nth-child(2),
    & li:first-child {
        border-left: none;
    }
`
const Nav = styled.nav`
    background-color:#ff6600;
`
const Li = styled.li`
    display:flex;
    align-items:center;
    list-style: none;
    margin: 1em;
`

function NavBar() {

    const { dispatch, state } = useContext(AuthContext);

    const responseGoogle = async (response:any) => {
        await auth_service.loginWithGoogle(response.tokenId);
        dispatch(loginUserWithGoogle(auth_service.getUser()));
    }

    const loggout = () => {
        dispatch(logOut());
        setUser(null);
    }

    const [user, setUser] = useState<User|null>(null);   

    useEffect(()=>{
        console.log(state.isAuthenticated)
        setUser(auth_service.getUser());
    },[state.isAuthenticated]);

    useEffect(()=>{},[user])

    return (
        <>
            <Nav>
                <Ul>
                    <NavItem>
                        <Li>
                            <Link to="/"><img src={logo} alt="logo" className="logoImage" /></Link>
                        </Li>
                        <Li>
                            <Link to="/" style={{fontWeight: "bold"}}>Haker News</Link>
                        </Li>
                        <Li>
                            <Link to="/news">News</Link>
                        </Li>
                        <Li>
                            <Link to="/threads">Threads</Link>
                        </Li>
                        <Li>
                            <p>Past</p>
                        </Li>
                        <Li>
                            <p>Comments</p>
                        </Li>
                        <Li>
                            <Link to="/ask">Ask</Link>
                        </Li>
                        <Li>
                            <p>Show</p>
                        </Li>
                        <Li>
                            <p>Jobs</p>
                        </Li>
                        <Li>
                            <Link to="/submit">Submit</Link>
                        </Li>
                    </NavItem>
                    
                    <NavItem>
                        {
                            user ? 
                            <Li className="nav-user">
                                <p>{user.full_name}({user.karma})</p>
                                <GoogleLogout
                                    clientId={env.GOOGLE_CLIENT_ID}
                                    buttonText="Logout"
                                    onLogoutSuccess={loggout}
                                    className='loggout-button'
                                />
                            </Li>
                            :
                            <Li className="nav-user">
                                <GoogleLogin
                                    clientId={env.GOOGLE_CLIENT_ID}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    className="loggin-button"
                                />
                            </Li>
                        }
                    </NavItem>
                    
                </Ul>
            </Nav>
        </>
    )
}

export default NavBar;