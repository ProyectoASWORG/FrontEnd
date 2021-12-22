import React , { FC, useState } from 'react'
import { User } from '../../../models/User';
import { useDispatch } from 'react-redux';
import { updateUserAction } from '../../../redux/user/userActions'
import './user.css'
import { Link } from 'react-router-dom';

const UserForm: FC<{user: User}> = ({user}) => {

    const [currentUser, setCurrentUser] = useState<User | null | any>(user);
    const dispatch = useDispatch();

    const onChangeForm = (e: any) => {
        setCurrentUser({...currentUser, [e.target.name]:e.target.value})
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(currentUser)
        dispatch(updateUserAction(currentUser));
    }

    return(
        <>
            <form>
                <table>
                    <tr>
                        <td className='c-gray' valign= "top"> <label> about: </label></td>
                        <td valign= "top"> <textarea rows={10} cols={50} value={currentUser?.about} name='about' onChange={onChangeForm}></textarea></td>
                    </tr>
                    <tr>
                        <td className='c-gray' valign= "top"> <label> email: </label></td> 
                        <td valign= "top"> <input disabled type="text" size={50} value={currentUser?.email} name='email' onChange={onChangeForm}></input></td>
                    </tr>
                    <tr>
                        <td className='c-gray' valign= "top"> <label> showdead: </label></td>
                        <td valign="top"> 
                        {
                            currentUser.show_dead?
                            <p>yes</p>
                            :
                            <p>no</p>
                        }
                        </td>

                    </tr>
                    <tr>
                        <td className='c-gray' valign= "top"> <label> noprocrast: </label></td>
                        <td valign="top"> 
                        {
                            currentUser.no_procrast?
                            <p>yes</p>
                            :
                            <p>no</p>
                        }
                        </td>
                    </tr>
                    <tr>
                        <td className='c-gray' valign= "top"> <label> maxvisit: </label></td>
                        <td valign= "top"> <input type="text" size={20} value={currentUser?.max_visit} name='max_visit' onChange={onChangeForm}></input></td>
                    </tr>
                    <tr>
                        <td className='c-gray' valign= "top"> <label> minaway: </label></td>
                        <td valign= "top"> <input type="text" size={20} value={currentUser?.min_away} name='min_away' onChange={onChangeForm}></input></td>
                    </tr>
                    <tr>
                        <td className='c-gray' valign= "top"> <label> delay: </label></td>
                        <td valign= "top"> <input type="text" size={20} value={currentUser?.delay} name='delay' onChange={onChangeForm}></input></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td className='link' valign='top'> <Link to={`/detailedCon/${currentUser?.id}`}> submissions</Link></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='link' valign='top'> <Link to={`/threads/${currentUser?.id}`}>comments</Link></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='link' valign='top'> 
                                <Link to="/">upvoted submissions</Link>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='link' valign='top'> <Link to={`/upvotedComments`}>upvoted comments</Link></td>
                        </tr>
                    <tr>
                        <br></br>
                        <button  onClick={onSubmit}>submit</button>   
                    </tr>
                </table>
            </form>
        </>
    )
}

export default UserForm;