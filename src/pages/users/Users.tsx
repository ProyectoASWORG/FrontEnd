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

    
    const {id} = useParams();
    const {isSignedIn, user} = useSelector((state:any)=> state.auth);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        if (id)
            user_service.getUser(id).then(user => setCurrentUser(user))
    }, [])

    useEffect(() => {

    }, [currentUser])


    const sameUser = () => {
        return (user?.id == id)
    }

    return(
        <>
            {
            currentUser?
            <div>
                <div className='comun'>
                    <table>
                        <tr>
                            <td className='c-gray' valign='top'> user:</td> 
                            <td valign='top'> {currentUser?.full_name}</td>
                        </tr>
                        <tr>
                            <td className='c-gray' valign='top'> created:</td> 
                            <td valign='top'> 
                                {
                                    currentUser?
                                    <TimeAgo date={currentUser.created_at}></TimeAgo>
                                    :null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='c-gray' valign='top'> karma:</td> 
                            <td valign='top' className='c-gray'> {currentUser?.karma}</td>
                        </tr>
                    </table>
                </div>
                <div>
                    {
                    sameUser()?
                    <div className='auth'>
                            <UserForm user={user}></UserForm>
                    </div>
                    :
                    <div className='simple'>
                        <table className='table'>
                        
                        <tr>
                            <td className='c-gray' valign='top'> about:</td> 
                            <td valign='top'> {currentUser?.about}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='link' valign='top'> submissions</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='link' valign='top'> comments</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='link' valign='top'> favorites</td>
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