import React, { Dispatch, FC, useContext, useEffect, useReducer, useState } from 'react';
import { FilterType } from '../../enums/FilterType';
import CommentsList from './Components/CommentsList';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsAction } from '../../redux/comments/commentActions';
import { useParams } from 'react-router';

const Comments = () => {
    const user = useSelector((state:any) => state.auth.user )

    const id = user.id; 
    
    const dispatch = useDispatch();
    const comments = useSelector((state: any)=> state.comment.comments);

    useEffect(()=>{
        dispatch(getCommentsAction(id));
    },[id, dispatch])    

    useEffect(()=>{
        console.log(`Lista de comments: ${comments}`);
    },[comments])


    return(
        <>
           <CommentsList comments={comments}></CommentsList> 
        </>
    )
}

export default Comments;