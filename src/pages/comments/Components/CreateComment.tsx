import React,{ FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Comment } from "../../../models/Comment";
import commentReducer from "../../../redux/comments/commentReducer";
import comments_service from "../../../services/comments_service";

const Div = styled.div`
    border: 1px solid red;
    background-color: #ff000017;
    width:200px;
    margin-left:6em;
    margin-bottom:5px;
`
const P = styled.p`
    color: red;
    font-size: 12px;
    text-align: center;
    `

    const CreateComment: FC<{contributionId:string, replayedCommentId:string}> = ({contributionId, replayedCommentId}) => {
        const navigate = useNavigate();

        const currentUser = useSelector((state:any) => state.auth.user);
    
        const [comment, setComment] = useState<Comment | null | any>({
            text: "",
            user_id: "",
            replayedComment_id:replayedCommentId,
            contribution_id:contributionId,
        });
    
        const {text, contribution_id} = comment;
    
        const [errors, setErrors] = useState<string[]>([])
    
        useEffect(()=>{
            setComment({...comment, user_id: currentUser?.id})
        },[currentUser])
    
        useEffect(()=>{
            setComment({...comment, contribution_id: contributionId })
        }, [contributionId])
        
        useEffect(()=>{
            setComment({...comment, replayedComment_id: replayedCommentId })
        }, [replayedCommentId])

        const onChange = (e: any) =>{
            setComment({
                ...comment,
                [e.target.name]: e.target.value
            })
        }

        console.log(comment.user_id);
    
        useEffect(()=>{console.log(errors)},[errors])
    
        const onSubmit = async (e: any) =>{
            e.preventDefault();
            setErrors([]);
            let errores = [];

            if(text.length === 0 ){
                errores.push("Text is required")
            }
            console.log(comment);
    
            if(errores.length === 0){
                let res = await comments_service.create(comment);
                setErrors([]);
                navigate(`/detailedCon/${contributionId}`);
            }else{
                setErrors(errores);
            }
    
        }
        return(
            <div>
                {errors.length > 0 ?
                (
                    <Div className="alert alert-danger">
                        {errors.map(error => <P key={error}>{error}</P>)}
                    </Div>
                )
                :null
                }
                <div className="field">
                    <label htmlFor="Text" className="form-label">Text:</label>
                    <textarea name="text" value={text} onChange={onChange}/>
                </div>
                <button className="margin-left"onClick={onSubmit}>submit</button>

            </div>
           
        )
    }
    
    export default CreateComment;