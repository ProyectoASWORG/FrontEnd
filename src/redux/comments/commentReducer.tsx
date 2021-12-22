import { Comment } from "../../models/Comment";
import { ADD_COMMENT, GET_COMMENTS, UPDATE_COMMENT } from "./actionTypes";
import { CommentAction, CommentState } from "./commentTypes";

const initialState: CommentState = {
    comments:[] 
}

const commentReducer = (
    state: CommentState = initialState,
    action: CommentAction
): CommentState => {
    switch (action.type) {
        case GET_COMMENTS:
            console.log('GET_COMMENTS', action.payload);
            return {
                ...state,
                comments: action.payload as Comment[]
            }
        case UPDATE_COMMENT:
            let commentPayload = action.payload as Comment
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if(comment.id === commentPayload.id) return commentPayload 
                    return comment
                })  
            }
        case ADD_COMMENT:
            let addCommentPayload = action.payload as Comment
          
            return {
                ...state,
                comments: [...state.comments, addCommentPayload]
            }
        default:
            return state;
    }
}

export default commentReducer;