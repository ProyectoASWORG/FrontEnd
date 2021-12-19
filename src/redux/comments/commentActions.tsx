import { FilterType } from "../../enums/FilterType";
import { Comment } from "../../models/Comment";
import comments_service from "../../services/comments_service";
import { DispatchType } from "./commentTypes";

export function getCommentsAction(id:string, type:FilterType){
    console.log("getCommentsAction")
    return async (dispatch: DispatchType) => {
        try{
            const comments = await comments_service.getUserComments(id,type) as Comment[];
            console.log(comments)
            dispatch(getComments(comments));
        }catch(e){
            console.log(e);
            return e;
        }
        
    }
}

const getComments = (payload: Comment|Comment[]) =>({
    type: "GET_COMMENTS",
    payload: payload
})

export function updatecommentAction(comment: Comment){
    return async (dispatch: DispatchType) => {
        try{
            dispatch(updatecomment(comment));
        }catch(e){
            console.log(e);
            return e;
        }
    }
}
const updatecomment = (payload: Comment) =>({
    type: "UPDATE_COMMENT",
    payload: payload
})
