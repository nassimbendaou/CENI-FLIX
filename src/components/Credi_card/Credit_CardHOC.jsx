import React from 'react';
import CreditCard from './CreditCard';




  const HocComponent = ({ ...props }) =>{ 

  return (
  <><CreditCard props={props} /></>
  );}

  HocComponent.propTypes = {
  };


export default HocComponent;
