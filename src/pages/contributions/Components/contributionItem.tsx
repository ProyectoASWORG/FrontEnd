import React, { FC, useEffect, useState } from 'react'
import { Contribution } from '../../../models/Contribution';
import { User } from '../../../models/User';
import auth_service from '../../../services/auth_service';
import arrow from '../../../assets/images/grayarrow.gif';
import user_service from '../../../services/user_service';
import './contribution.css';


const ContributionItem: FC<{ contribution: Contribution, index: number }> = ({ contribution, index }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<User | null>(null);
  useEffect(()=>{
    setCurrentUser(auth_service.getUser());
    user_service.getUser(contribution.user_id).then(user=>setCreator(user))
    
  },[])

  return (
    <div className="contribution">
      <div className="contribution-index">
        {
          index !== -1 ? `${index}.`: null
        }
        {
          currentUser?.id === contribution.user_id ?
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
          <p>{contribution.created_at}</p>
          <p>discuss</p>        
        </div>
      </div>

    </div>
  );
}

export default ContributionItem;