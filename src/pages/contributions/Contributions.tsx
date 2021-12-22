import React, { FC, useEffect } from 'react';
import { FilterType } from '../../enums/FilterType';
import ContributionList from './Components/contributionList';
import { useDispatch, useSelector } from 'react-redux';
import { getContributionsAction } from '../../redux/contributions/contributionActions';

const Contributions: FC<{type: FilterType}> = ({type}) => {

    const dispatch = useDispatch();
    const contributions = useSelector((state: any)=> state.contribution.contributions);

    useEffect(()=>{
        dispatch(getContributionsAction(type));
    },[type, dispatch])    

    useEffect(()=>{
    },[contributions])


    return(
        <>
            {contributions ?
                <ContributionList contributions={contributions}></ContributionList>:null 
            }
        </>
    )
}

export default Contributions;