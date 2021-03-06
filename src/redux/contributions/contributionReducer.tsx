import { Contribution } from "../../models/Contribution";
import { GET_CONTRIBUTIONS, UPDATE_CONTRIBUTION } from "./actionTypes";
import { ContributionAction, ContributionState } from "./contributionTypes";

const initialState: ContributionState = {
    contributions:[] 
}

const contributionReducer = (
    state: ContributionState = initialState,
    action: ContributionAction
): ContributionState => {
    switch (action.type) {
        case GET_CONTRIBUTIONS:
            return {
                ...state,
                contributions: action.payload as Contribution[]
            }
        case UPDATE_CONTRIBUTION:
            let contributionPayload = action.payload as Contribution
            return {
                ...state,
                contributions: state.contributions.map(contribution => {
                    if(contribution.id === contributionPayload.id) return contributionPayload 
                    return contribution
                })  
            }
        default:
            return state;
    }
}

export default contributionReducer;