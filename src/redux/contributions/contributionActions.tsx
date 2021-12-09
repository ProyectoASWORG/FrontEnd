import { FilterType } from "../../enums/FilterType";
import { Contribution } from "../../models/Contribution";
import contributions_service from "../../services/contributions_service";
import { DispatchType } from "./contributionTypes";

export function getContributionsAction(type: FilterType){
    console.log("getContributionsAction")
    return async (dispatch: DispatchType) => {
        try{
            const contributions = await contributions_service.getContributions(type) as Contribution[];
            console.log(contributions)
            dispatch(getContributions(contributions));
        }catch(e){
            console.log(e);
            return e;
        }
        
    }
}

const getContributions = (payload: Contribution|Contribution[]) =>({
    type: "GET_CONTRIBUTIONS",
    payload: payload
})

export function updateContributionAction(contribution: Contribution){
    return async (dispatch: DispatchType) => {
        try{
            dispatch(updateContribution(contribution));
        }catch(e){
            console.log(e);
            return e;
        }
    }
}
const updateContribution = (payload: Contribution) =>({
    type: "UPDATE_CONTRIBUTION",
    payload: payload
})
