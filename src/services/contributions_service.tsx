import axios from "axios"
import env from "react-dotenv"
import { FilterType } from "../enums/FilterType";
import { Contribution } from "../models/Contribution";

class ContributionsService {
    
    public getContributions = async (filter: FilterType): Promise<Contribution[]> =>{
        return await axios.get(`${env.API_URL}/contributions${filter}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
        ).then(contributions => {return contributions.data})
        .catch(error => {console.log(error);})
    }

    public getUpvotedContributions = async (id:string): Promise<Contribution[]> =>{
        return await axios.get(`${env.API_URL}/contributions/${id}/show_upvoted_contributions.json`)
            .then(contributions => {return contributions.data})
            .catch(error => {console.log(error);})
    }
}

export default new ContributionsService();