import React, { FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/context';
import { FilterType } from '../../enums/FilterType';
import { Contribution } from '../../models/Contribution';
import auth_service from '../../services/auth_service';
import contributions_service from '../../services/contributions_service';
import ContributionList from './Components/contributionList';


const Contributions: FC<{type: FilterType}> = ({type}) => {

    const [contributions, setContributions] = useState<Contribution[]>([]);

    useEffect(()=>{
        contributions_service.getContributions(type)
            .then(contributions => {setContributions(contributions);})
            .catch(err => console.log(err));
    },[type])    


    return(
        <>
           <ContributionList contributions={contributions}></ContributionList> 
        </>
    )
}

export default Contributions;