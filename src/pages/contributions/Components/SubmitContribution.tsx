import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Contribution } from "../../../models/Contribution";
import contributions_service from "../../../services/contributions_service";


const SubmitContribution: FC = () => {

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

        if(errores.length === 0){
            let res = await contributions_service.create(contribution);
            console.log(res);
            setErrors([]);
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
                errors.map(error => <p key={error}>{error}</p>)
            :null
            }

            <div className="field">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" value={title} onChange={onChange}/>
            </div>
            <div className="field">
                <label htmlFor="Url">Url:</label>
                <input type="text" name="url" value={url} onChange={onChange}/>
            </div>
            <div className="field">
                <label htmlFor="Text">Text:</label>
                <input type="text" name="text" value={text} onChange={onChange}/>
            </div>
            <button onClick={onSubmit}>submit</button>
        </div>
    )
}

export default SubmitContribution;