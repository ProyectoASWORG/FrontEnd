import React, { FC, FunctionComponent, useContext, useEffect, useState } from 'react'
import arrow from '../../../assets/images/grayarrow.gif';
import user_service from '../../services/user_service';
import { User } from '../../models/User';
import { AuthContext } from '../../context/auth/context';
import TimeAgo from 'react-timeago';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import UserForm from './Components/userForm';


const Users: FC = () => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const {id} = useParams();
    const [creator, setCreator] = useState<User | null>(null);
    const { state } = useContext(AuthContext);
    const isSignedIn = useSelector((state:any)=> state.auth.isSignedIn);

    useEffect(()=>{
        setCurrentUser(state.user)
      },[state.user])

    useEffect(()=>{user_service.updateUser(currentUser)},[currentUser])

    useEffect(()=>{
        setCurrentUser(state.user);
        if(id) user_service.getUser(id).then(user=>setCreator(user))
        },[])


    const sameUser = () => {
        return (currentUser?.id === id)
    }

    return(
        <>
            {
            creator?
            <div>
                <div className='comun'>
                <table>
                    <tr>
                        <td className='c-gray' valign="top"> user:</td> 
                        <td className='c-gray'> {creator?.full_name}</td>
                    </tr>
                    <tr>
                        <td className='c-gray' valign="top"> created:</td> 
                        <td className='c-gray'> 
                            {
                                creator?
                                <TimeAgo date={creator.created_at}></TimeAgo>
                                :null
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className='c-gray' valign="top"> karma:</td> 
                        <td className='c-gray'> {creator?.karma}</td>
                    </tr>
                </table>
            </div>
            <div>
                {
                sameUser()?
                <div className='auth'>
                    {
                        creator?
                        <UserForm users={creator}></UserForm>
                        :
                        <></>
                    }
                    
                </div>
                :
                <div className='simple'>
                    <table className='table'>
                    
                    <tr>
                        <td className='c-gray' valign="top"> about:</td> 
                        <td className='c-gray'> {creator?.about}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className='link'> submissions</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className='link'> comments</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className='link'> favorites</td>
                    </tr>
                </table>
                </div>
                }
            </div>
            </div>
            :
            <></>
            }
        </>  
    )
}

export default Users;