import axios from "axios"
import { url } from "inspector";
import env from "react-dotenv"
import { FilterType } from "../enums/FilterType";
import { Contribution } from "../models/Contribution";
import auth_service from "./auth_service";

class ContributionsService { 

    public getContributions = async (filter: FilterType): Promise<Contribution[]> =>{
        let url = this.makeUrl(filter);
        return await axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
        ).then(contributions => {return contributions.data})
        .catch(error => {console.log(error);})
    }

    private makeUrl = (filter: FilterType) => {
        let url; 
        if(filter === FilterType.UPVOTEDCONTRIBUTIONS){
            let id = auth_service.getUser()?.id;
            url = `${env.API_URL}/contributions/${id}/show_upvoted_contributions.json`;
        }
        else url = `${env.API_URL}/contributions${filter}`;
        return url;
    }

    public getUpvotedContributions = async (id:string): Promise<Contribution[]> =>{
        return await axios.get(`${env.API_URL}/contributions/${id}/show_upvoted_contributions.json`)
            .then(contributions => {return contributions.data})
            .catch(error => {console.log(error);})
    }

    public getUserContributions = async (id:string): Promise<Contribution[]> =>{
        return await axios.get(`${env.API_URL}/contributions/${id}/show_user.json`)
            .then(contributions => {return contributions.data})
            .catch(error => {console.log(error);})
    }


    public getContribution = async (id:string): Promise<Contribution> =>{
        return await axios.get(`${env.API_URL}/contributions/${id}.json`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
        ).then(contributions => {return contributions.data})
        .catch(error => {console.log(error);})
    }

    public vote = async (id:string) =>{
        return await axios.put(`${env.API_URL}/contributions/${id}/like`)
            .then(res => console.log(res))
            .catch(error => {console.log(error);})
    }

    public unvote = async (id:string) =>{
        return await axios.put(`${env.API_URL}/contributions/${id}/dislike`)
            .then(res => console.log(res))
            .catch(error => {console.log(error);})
    }

    public create = async (contribution: Contribution) => {
        return await axios.post(`${env.API_URL}/contributions.json`, contribution)
            .then(res => {return {status: res.status, data: res.data}})
            .catch(error => error)

    }
}

export default new ContributionsService();