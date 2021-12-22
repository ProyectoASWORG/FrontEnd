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
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction, logoutUserAction, setUserAction } from '../redux/user/userActions';
import user_service from '../services/user_service';
import { current } from '@reduxjs/toolkit';

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


    const dispatch = useDispatch();

    const user = useSelector((state:any) => state.auth.user )
    console.log(user);
    console.log(env.GOOGLE_CLIENT_ID);

    const responseGoogle = async (response:any) => {
        console.log(response);
        dispatch(loginUserAction(response.tokenId));
    }

    const loggout = () => {
        dispatch(logoutUserAction());
    }

    useEffect(()=>{console.log(user)},[user])

    useEffect(()=>{
        let currentUser = auth_service.getUser();
        console.log(currentUser);
        if(currentUser){
            dispatch(setUserAction(currentUser));
        }
    },[dispatch])


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
                            {user ? <Link to={`/threads/${user.id}`}> Threads</Link>: "Threads"}
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
                            user?.id ? 
                            <Li className="nav-user">
                                <Link to = {`user/${user?.id}`} >{user?.full_name}({user?.karma})</Link> 
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