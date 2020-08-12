import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/navigationItems';
import DrawerToggle from '../sidedrawer/drawerToggle/drawerToggle';


const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.menuClicked}/>
         <div className={classes.Logo}>
           <Logo />
         </div>
        <nav className={classes.displayOnly}>
          <NavigationItems />
        </nav>
    </header>
)

export default toolbar;