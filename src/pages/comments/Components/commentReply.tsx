import React, { FC } from 'react'
import { Comment } from '../../../models/Comment';
import CommentItem from './commentItem';

const CommentReply: FC<{}> = ({}) =>{
  
  return (
      <>
        <div>
            <form>
                <textarea rows={10} cols={50}  name='reply' ></textarea>
                <br></br>
                <button>reply</button>
            </form>
        </div>

      </>
)
}

export default CommentReply;