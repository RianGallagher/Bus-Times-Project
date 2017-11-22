import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/something">Something</NavigationItem>
        <NavigationItem link="/auth">Authenticate</NavigationItem>
		<NavigationItem link="/Map"> Bus Stops near Me!</NavigationItem>
    </ul>
);

export default navigationItems;