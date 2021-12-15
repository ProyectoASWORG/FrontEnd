import React, { FC, useContext, useEffect, useState } from 'react'
import { User } from '../../../models/User';
import user_service from '../../../services/user_service';
import { AuthContext } from '../../../context/auth/context';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useLinkClickHandler } from 'react-router-dom';

const UserForm: FC<{users: User}> = ({users}) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const {id} = useParams();
    const [creator, setCreator] = useState<User | null>(null);
    const { state } = useContext(AuthContext);
    const isSignedIn = useSelector((state:any)=> state.auth.isSignedIn);

    useEffect(()=>{
        setCurrentUser(state.user)
      },[state.user])


    useEffect(()=>{
        setCurrentUser(state.user);
        if(id) user_service.getUser(id).then(user=>setCreator(user))
        },[])

    return(
        <>
            <form>
                <table>
                    <tr>
                        <div className="field">
                            <td className='c-gray' valign= "top"> <label> about: </label></td>
                            <td valign= "top"> <textarea rows={10} cols={50} value={creator?.about}></textarea></td>
                    </div>
                    </tr>
                    <tr>
                        <div className="field">
                            <td className='c-gray' valign= "top"> <label> email: </label></td>
                            <td valign= "top"> <input type="text" size={50} value={creator?.email} onChange={(e) => user_service.updateUser(currentUser)}></input></td>
                        </div>
                    </tr>
                    <tr>
                        <div className="submit">
                            <br></br>
                            <td>
                                <input type="submit" value="submit" ></input>   
                            </td>
                        </div>
                    </tr>
                </table>
            </form>
        </>
    )
}

export default UserForm;