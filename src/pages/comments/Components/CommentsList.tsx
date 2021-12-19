import React, { FC } from 'react'
import { Comment } from '../../../models/Comment';
import CommentItem from './commentItem';

const CommentList: FC<{comments: Comment[]}> = ({comments}) =>{
  
  return (
      <>
        {
            comments.map((comment, index) => 
                <CommentItem key={comment.id} comment={comment} ></CommentItem> 
            )
        }

      </>
)
}

export default CommentList;