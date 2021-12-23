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
import { Link } from 'react-router-dom';
import comments_service from '../../../services/comments_service';
import { updateCommentAction } from '../../../redux/comments/commentActions';

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

    const voteComment = () =>{
      if(currentUser){
        comments_service.vote(comment.id)
        .then((res) => {
          let voted: string[];
  
          voted = currentUser.voted_comment_ids ? [...currentUser.voted_comment_ids, comment.id] : [comment.id]
  
          setCurrentUser({
            ...currentUser,
            voted_comment_ids: voted 
          });
          console.log(currentUser.voted_comment_ids);
          comment.points ++;
          dispatch(updateCommentAction(comment));
        })
      }
    }
  
    const unvoteComment = () =>{
      if(currentUser){
        comments_service.unvote(comment.id)
        .then(res => {
          setCurrentUser({
            ...currentUser,
            voted_comment_ids: currentUser.voted_comment_ids.filter(id => id !== comment.id) 
          });
          comment.points --;
          dispatch(updateCommentAction(comment));
        });
      }
    }
  
    const userVotedComment = () => {
      if(currentUser && currentUser?.voted_comment_ids){
        return currentUser?.voted_comment_ids.some(comment_id=>comment_id===comment.id)
      }
      return false;
    }





    return (
        <div >
        <div className="comment-item-container font-sm">
        {
          (currentUser?.id === creator?.id) ?
            <span className="c-orange">*</span>
          :
            <img src={arrow} alt="arrow" 
              className={`contribution-arrow ${userVotedComment() ? "inactive" : ""}`} onClick={voteComment}/>
        }
            <p className="c-gray m-5">{comment.points} points</p>
            <p className="c-gray m-5">by</p>
            <Link to={`/user/${creator?.id}`}>{creator?.full_name}&nbsp;</Link>
            <TimeAgo date={comment.created_at}></TimeAgo>
            {
            userVotedComment() ?
            <p onClick={unvoteComment} className="pointer"> unvote</p>
            :null
          }
            <p className="c-gray m-5">on:<Link to={`/detailedCon/${comment.contribution_id}`}> {comment.contribution_title} </Link> </p>
        </div>
        <div className="reply-link">
            <p className="font-sm">{ comment.text }</p>
        </div>
        <div className="reply-link">
          <p className="font-sm">
            <Link className="c-gray" to={`/reply/${comment.id}/${comment.contribution_id}/${creator?.full_name}/${comment.text}/${comment.created_at}`}> reply </Link>
          </p>
        </div>
    </div>
            
      );

  
}

export default CommentItem;