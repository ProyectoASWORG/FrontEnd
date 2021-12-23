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
import { User } from '../../models/User';
import user_service from '../../services/user_service';
import { Link } from 'react-router-dom';

const DetailedContribution:FC  = ()=> {
    const {id} = useParams();
    
   const [currentContrib, setCurrentContrib] = useState<Contribution | null>(null);
   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const [creator, setCreator] = useState<User | null>(null);
   const { user } = useSelector((state:any) => state.auth); 

    useEffect(()=>{
        if(id)
            contributions_service.getContribution(id).then(contrib=> setCurrentContrib(contrib));
    },[]) 

    useEffect(()=>{
        if(currentContrib){
            setCurrentUser(user);
             user_service.getUser(currentContrib.user_id).then(creator => setCreator(creator))
        }
        
      },[currentContrib])   

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
                    <div className="detailedCon">
                        <div className="detailedCon-text">
                            <div className="detailedCon-title">
                                <p> {currentContrib?.title} </p>
                            </div>
                            <div className="detailedCon-info">
                                <p> {currentContrib.points} points </p>
                                <p>by</p>
                                <p><Link to={`/user/${creator?.id}`}> {creator?.full_name} </Link></p>
                                <TimeAgo date={currentContrib.created_at}></TimeAgo>
                                
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