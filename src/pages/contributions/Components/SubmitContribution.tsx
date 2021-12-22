import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Contribution } from "../../../models/Contribution";
import contributions_service from "../../../services/contributions_service";
import './contribution.css'

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

const SubmitContribution: FC = () => {
    const navigate = useNavigate();

    const currentUser = useSelector((state:any) => state.auth.user);

    const [contribution, setContribution] = useState<Contribution | null | any>({
        title: "",
        text: "",
        url: "",
        user_id: "",
    });

    const {title, url, text} = contribution;

    const [errors, setErrors] = useState<string[]>([])

    useEffect(()=>{
        setContribution({...contribution, user_id: currentUser?.id})
    },[currentUser])

    const onChange = (e: any) =>{
        setContribution({
            ...contribution,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{console.log(errors)},[errors])

    const onSubmit = async (e: any) =>{
        e.preventDefault();
        setErrors([]);
        let errores = [];

        if(url.length > 0 && !isUrl(url)){
            errores.push("Invalid URL")
        }

        if(text.length === 0 && url.length === 0){
            errores.push("Text or URL is required")
        }

        if(title.length === 0){
            errores.push("Title is required")
        }

        if(errores.length === 0){
            let res = await contributions_service.create(contribution);
            console.log(res);
            setErrors([]);
            navigate("/news");
        }else{
            setErrors(errores);
        }

    }

    const isUrl = (url:string)=>{
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(url);
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
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" name="title" value={title} onChange={onChange}/>
            </div>
            <div className="field">
                <label htmlFor="Url" className="form-label">Url:</label>
                <input type="text" name="url" value={url} onChange={onChange}/>
            </div>
            <p className="margin-left text">or</p>
            <div className="field">
                <label htmlFor="Text" className="form-label">Text:</label>
                <textarea name="text" value={text} onChange={onChange}/>
            </div>
            <button className="margin-left"onClick={onSubmit}>submit</button>
        </div>
    )
}

export default SubmitContribution;