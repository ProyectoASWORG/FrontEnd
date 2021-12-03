import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/context';
import { Contribution } from '../../models/Contribution';
import auth_service from '../../services/auth_service';
import contributions_service from '../../services/contributions_service';


function Contributions() {

    const { state } = useContext(AuthContext);
    const [contributions, setContributions] = useState<Contribution[]>([]);

    useEffect(()=>{
        const user = auth_service.getUser();
        if(user)
            contributions_service.getContributions()
                .then(contributions => {setContributions(contributions); console.log(contributions)})
                .catch(err => console.log(err));
    },[])    

    return(
        <>
            {
                contributions.map(contribution => {
                    return(
                        <div key={contribution.id}>
                            <h3>{contribution.title}</h3>
                            <p>{contribution.text}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Contributions;