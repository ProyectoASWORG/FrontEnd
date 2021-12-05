import React, { FC, useContext, useEffect, useState } from 'react'
import { Contribution } from '../../../models/Contribution';
import { User } from '../../../models/User';
import arrow from '../../../assets/images/grayarrow.gif';
import user_service from '../../../services/user_service';
import './contribution.css';
import { AuthContext } from '../../../context/auth/context';
import TimeAgo from 'react-timeago';

const ContributionItem: FC<{ contribution: Contribution, index: number }> = ({ contribution, index }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<User | null>(null);
  const { state } = useContext(AuthContext);

  useEffect(()=>{
    setCurrentUser(state.user);
    user_service.getUser(contribution.user_id).then(user=>setCreator(user))
  },[])

  useEffect(()=>{
    setCurrentUser(state.user)
  },[state.user])

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
            <img src={arrow} alt="arrow" className="contribution-arrow" />
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
          <p>{creator?.full_name}</p>
          <TimeAgo date={contribution.created_at}></TimeAgo>
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