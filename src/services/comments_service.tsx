import axios from "axios"
import env from "react-dotenv"
import { FilterType } from "../enums/FilterType";
import { Comment } from "../models/Comment";

class CommentsService {
    
    public getUserComments = async (id:string): Promise<Comment[]> =>{
        return await axios.get(`${env.API_URL}/comments/${id}/show_comments.json`)
        .then(comments => {return comments.data})
        .catch(error => {console.log(error);})
    }

}

export default new CommentsService();