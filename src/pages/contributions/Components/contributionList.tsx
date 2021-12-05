import React, { FC } from 'react'
import { Contribution } from '../../../models/Contribution';
import ContributionItem from './contributionItem';

const ContributionList: FC<{contributions: Contribution[]}> = ({contributions}) =>{
  
  return (
      <>
        {
            contributions.map((contribution, index) => 
                <ContributionItem key={contribution.id} contribution={contribution} index={index}></ContributionItem> 
            )
        }

      </>
)
}

export default ContributionList;