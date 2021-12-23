import React, { FC } from 'react'
import { useParams } from 'react-router-dom';
import CreateComment from './CreateComment';
import TimeAgo from 'react-timeago';


const CommentReply: FC<{}> = ({}) =>{

    const {id, contributionId, nombre, texto, created_at} = useParams();
  
  return (
      <>
        <div>
          <p className='comment-item'> {texto} by: {nombre} {
                created_at?
                <TimeAgo date={created_at}></TimeAgo>
                :
                <></>
            }
          </p>
        </div>
        <div>
            <CreateComment contributionId={`${contributionId}`} replayedCommentId={`${id}`}></CreateComment>
        </div>
      </>
)
}

export default CommentReply;