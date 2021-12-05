import { Contribution } from "../../models/Contribution"

export type ContributionState = {
    contributions: Contribution[];
}

export type ContributionAction = {
    type: string;
    payload: Contribution | Contribution[]; 
}

export type DispatchType = (args: ContributionAction) => ContributionAction
