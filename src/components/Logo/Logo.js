import React from 'react';
import busLogo from '../logo.svg.png';
import classes from './Logo.css';

const logo = (props) => (
 
   <div className={classes.Logo} style={{height: props.height}}>
 
       <img src={busLogo} alt="Buuuus |o|o|D" />
   
 </div>
);


export default logo;