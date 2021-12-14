import { Comment } from "../../models/Comment"

export type CommentState = {
    comments: Comment[];
}

export type CommentAction = {
    type: string;
    payload: Comment | Comment[]; 
}

export type DispatchType = (args: CommentAction) => CommentAction
