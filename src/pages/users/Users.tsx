import React, { FC, FunctionComponent, useContext, useEffect, useState } from 'react'
import arrow from '../../../assets/images/grayarrow.gif';
import user_service from '../../services/user_service';
import { User } from '../../models/User';
import { AuthContext } from '../../context/auth/context';
import TimeAgo from 'react-timeago';
import env from 'react-dotenv';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';

const Users: FC = () => {

    const {id} = useParams();

    return(
        <>
            <h1>Perfil de Usuario</h1>
        </>
    )
}

export default Users;