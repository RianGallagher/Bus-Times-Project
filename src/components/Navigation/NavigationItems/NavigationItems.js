import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/livetimes">Live Times</NavigationItem>
        <NavigationItem link="/times">Timetable</NavigationItem>
        <NavigationItem link="/Notification">Set Notification</NavigationItem>
        <NavigationItem link="/auth">Authenticate</NavigationItem>
		<NavigationItem link="/Map"> Bus Stops near Me!</NavigationItem>
		<NavigationItem link="/Social"> Social Media</NavigationItem>
    </ul>
);

export default navigationItems;