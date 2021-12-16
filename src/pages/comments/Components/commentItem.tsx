import React, { FC, useContext, useEffect, useState } from 'react'
import { Comment} from '../../../models/Comment';
import { User } from '../../../models/User';
import arrow from '../../../assets/images/grayarrow.gif';
import user_service from '../../../services/user_service';
import { AuthContext } from '../../../context/auth/context';
import TimeAgo from 'react-timeago';
import env from 'react-dotenv';
import './commentItem.css'
import { useDispatch, useSelector } from 'react-redux';

const CommentItem: FC<{ comment: Comment }> = ({ comment}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [creator, setCreator] = useState<User | null>(null);
    const { state } = useContext(AuthContext);
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state:any)=> state.auth.isSignedIn);
  
    useEffect(()=>{
      setCurrentUser(state.user);
      user_service.getUser(comment.user_id).then(user=>setCreator(user))
    },[])
  
    useEffect(()=>{
      setCurrentUser(state.user)
    },[state.user])
  
    useEffect(()=>{},[comment])
  
    useEffect(()=>{user_service.updateUser(currentUser)},[currentUser])

    return (
        <div >
        <div className="comment-item-container font-sm">
            <span className="c-orange m-5">*</span>
            <p className="c-gray m-5">{comment.points} points</p>
            <p className="c-gray m-5">by {creator?.full_name}</p>
            <TimeAgo date={comment.created_at}></TimeAgo>
            {console.log(comment.contribution_title)}
            <p className="c-gray m-5">on: {comment.contribution_title}</p>
        </div>
        <div className="reply-link">
            <p className="font-sm">{ comment.text }</p>
        </div>
    </div>
            
      );

  
}

export default CommentItem;