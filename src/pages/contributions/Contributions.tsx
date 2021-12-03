import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/context';
import { Contribution } from '../../models/Contribution';
import auth_service from '../../services/auth_service';
import contributions_service from '../../services/contributions_service';
import ContributionList from './Components/contributionList';


function Contributions() {

    const { state } = useContext(AuthContext);
    const [contributions, setContributions] = useState<Contribution[]>([]);

    useEffect(()=>{
        const user = auth_service.getUser();
        if(user)
            contributions_service.getContributions()
                .then(contributions => {setContributions(contributions);})
                .catch(err => console.log(err));
    },[])    

    return(
        <>
           <ContributionList contributions={contributions}></ContributionList> 
        </>
    )
}

export default Contributions;