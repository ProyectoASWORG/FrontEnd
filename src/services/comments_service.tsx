import axios from "axios"
import env from "react-dotenv"
import { FilterType } from "../enums/FilterType";
import { Comment } from "../models/Comment";

class CommentsService {
    
    public getUserComments = async (id:string, type:FilterType): Promise<Comment[]> =>{
        return await axios.get(`${env.API_URL}/comments/${id}/${type}`)
        .then(comments => {return comments.data})
        .catch(error => {console.log(error);})
    }

    public create = async (comment: Comment):Promise<Comment> => {
        return await axios.post(`${env.API_URL}/comments.json`, comment)
            .then(res => {return res.data})
            .catch(error => error)

    }
    public vote = async (id:string) =>{
        return await axios.put(`${env.API_URL}/comments/${id}/like`)
            .then(res => console.log(res))
            .catch(error => {console.log(error);})
    }

    public unvote = async (id:string) =>{
        return await axios.put(`${env.API_URL}/comments/${id}/dislike`)
            .then(res => console.log(res))
            .catch(error => {console.log(error);})
    }

}

export default new CommentsService();