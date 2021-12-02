import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { GoogleResponse } from '../models/GoogleResponse';
import env from 'react-dotenv';

const Ul = styled.ul`
    display: flex;
`
const Li = styled.li`
    list-style: none;
    margin: 1em;
`

function NavBar() {


    const responseGoogle = (response:any) => {
        setToken(response);
    }
    const [token, setToken] = useState<GoogleResponse>();

    return (
        <>
            <nav>
                <Ul>
                    <Li>
                        <Link to="/">Home</Link>
                    </Li>
                    <Li>
                        <GoogleLogin
                            clientId={env.GOOGLE_CLIENT_ID}
                            buttonText="Login" 
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </Li>
                </Ul>
            </nav>

            {
                token 
                ?
                <p>{token.tokenId}</p>
                :
                null
            }
        </>
    )
}

export default NavBar;