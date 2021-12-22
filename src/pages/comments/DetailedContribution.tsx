import React, { FC, useEffect, useState } from 'react';
import CommentsList from './Components/CommentsList';
import contributions_service from '../../services/contributions_service';
import { Contribution } from '../../models/Contribution';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsAction } from '../../redux/comments/commentActions';
import { FilterType } from '../../enums/FilterType';
import TimeAgo from 'react-timeago';
import '../contributions/Components/contribution.css'

import ContributionItem from '../contributions/Components/contributionItem';
import { useParams } from 'react-router';
import CreateComment from './Components/CreateComment';

const DetailedContribution:FC  = ()=> {
    const {id} = useParams();
    
   const [currentContrib, setCurrentContrib] = useState<Contribution | null>(null);

    useEffect(()=>{
        if(id)
            contributions_service.getContribution(id).then(contrib=> setCurrentContrib(contrib));
    },[])    

    console.log(currentContrib);

    const dispatch = useDispatch();
    const comments = useSelector((state: any)=> state.comment.comments);

    useEffect(()=>{
        if(id)
            dispatch(getCommentsAction(id, FilterType.CONCOMMENTS));
    },[id, dispatch])  

    useEffect(()=>{
    },[comments])
   


    return(
        <>
            {
                currentContrib?
                    <>
                    <div className="contribution">
                        <div className="contribution-text">
                            <div className="contribution-title">
                                <p className="c-gray"> {currentContrib?.title} </p>
                            </div>
                            <div className="contribution-info">
                                <p> {currentContrib.points} points </p>
                                <p>by</p>
                                <p> {currentContrib.user_id}</p> 
                                <TimeAgo date={currentContrib.created_at}></TimeAgo>
                                <p>discuss</p>
                            </div>
                            <p className="c-gray"> {currentContrib.text} </p> 
                        </div>
                    </div> 
                    <CreateComment contributionId={`${currentContrib.id}`} replayedCommentId=''></CreateComment>
                    <CommentsList comments={comments}></CommentsList>
                    </>
                :
                    <></>
            }
        </>
    )
}

export default DetailedContribution;