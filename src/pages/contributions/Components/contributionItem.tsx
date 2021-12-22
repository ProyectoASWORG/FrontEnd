import React, { FC, useContext, useEffect, useState } from 'react'
import { Contribution } from '../../../models/Contribution';
import { User } from '../../../models/User';
import arrow from '../../../assets/images/grayarrow.gif';
import user_service from '../../../services/user_service';
import './contribution.css';
import { AuthContext } from '../../../context/auth/context';
import TimeAgo from 'react-timeago';
import contributions_service from '../../../services/contributions_service';
import { useDispatch, useSelector } from 'react-redux';
import { updateContributionAction } from '../../../redux/contributions/contributionActions';
import { Link } from 'react-router-dom';

const ContributionItem: FC<{ contribution: Contribution, index: number }> = ({ contribution, index }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<User | null>(null);
  const { user } = useSelector((state:any) => state.auth); 
  const dispatch = useDispatch();


  useEffect(()=>{
    setCurrentUser(user);
    user_service.getUser(contribution.user_id).then(creator => setCreator(creator))
  },[])

  useEffect(()=>{},[contribution])

  useEffect(()=>{user_service.updateUser(currentUser)},[currentUser])

  const voteContribution = () =>{
    if(currentUser){
      contributions_service.vote(contribution.id)
      .then((res) => {
        let voted: string[];

        voted = currentUser.voted_contribution_ids ? [...currentUser.voted_contribution_ids, contribution.id] : [contribution.id]

        setCurrentUser({
          ...currentUser,
          voted_contribution_ids: voted 
        });

        contribution.points ++;
        dispatch(updateContributionAction(contribution));
      })
    }
  }

  const unvoteContribution = () =>{
    if(currentUser){
      contributions_service.unvote(contribution.id)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          voted_contribution_ids: currentUser.voted_contribution_ids.filter(id => id !== contribution.id) 
        });
        contribution.points --;
        dispatch(updateContributionAction(contribution));
      });
    }
  }

  const userVotedContribution = () => {
    if(currentUser && currentUser?.voted_contribution_ids){
      return currentUser?.voted_contribution_ids.some(contribution_id=>contribution_id===contribution.id)
    }
    return false;
  }

  return (
    <div className="contribution">
      <div className="contribution-index">
        {
          index !== -1 ? `${index}.`: null
        }
        {
          (currentUser?.id === creator?.id) ?
            <span className="c-orange">*</span>
          :
            <img src={arrow} alt="arrow" 
              className={`contribution-arrow ${userVotedContribution() ? "inactive" : ""}`} onClick={voteContribution}/>
        }
      </div>
      <div className="contribution-text">
        <div className="contribution-title">
          {contribution.title}
          {
            contribution.url?
            <p>{contribution.url}</p>
            :null
          }
        </div>
        <div className="contribution-info">
          <p>{contribution.points} points</p>
          <p>by</p>
          <p><Link to={`/user/${creator?.id}`}> {creator?.full_name} </Link></p>
          <TimeAgo date={contribution.created_at}></TimeAgo>
          {
            userVotedContribution() ?
            <p onClick={unvoteContribution} className="pointer">unvote</p>
            :null
          }
          {
            contribution.comment_count===0 ?
              <p>discuss</p>        
            :
              <p>{contribution.comment_count} comments</p>
          }
        </div>
      </div>

    </div>
  );
}

export default ContributionItem;