import React, { FC } from 'react'
import { useParams } from 'react-router-dom';
import { Comment } from '../../../models/Comment';
import CommentItem from './commentItem';
import CreateComment from './CreateComment';
import TimeAgo from 'react-timeago';


const CommentReply: FC<{}> = ({}) =>{

    const {id, contributionId, nombre, texto, created_at} = useParams();
  
  return (
      <>
        <div>
            <p>{nombre} {texto } 
            {
                created_at?
                <TimeAgo date={created_at}></TimeAgo>
                :
                <></>
            }
            </p>
            
            <CreateComment contributionId={`${contributionId}`} replayedCommentId={`${id}`}></CreateComment>
        </div>
      </>
)
}

export default CommentReply;