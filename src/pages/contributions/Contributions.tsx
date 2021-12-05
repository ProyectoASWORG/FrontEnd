import React, { Dispatch, FC, useContext, useEffect, useReducer, useState } from 'react';
import { FilterType } from '../../enums/FilterType';
import ContributionList from './Components/contributionList';
import { useDispatch, useSelector } from 'react-redux';
import { getContributionsAction } from '../../redux/contributions/contributionActions';
import { ContributionState } from '../../redux/contributions/contributionTypes';

const Contributions: FC<{type: FilterType}> = ({type}) => {

    const dispatch = useDispatch();
    const contributions = useSelector((state: ContributionState)=> state.contributions);

    useEffect(()=>{
        dispatch(getContributionsAction(type));
    },[type, dispatch])    

    useEffect(()=>{
        console.log(`Lista de contribuciones: ${contributions}`);
    },[contributions])


    return(
        <>
           <ContributionList contributions={contributions}></ContributionList> 
        </>
    )
}

export default Contributions;