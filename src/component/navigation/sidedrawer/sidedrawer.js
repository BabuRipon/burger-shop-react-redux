import React from 'react';
import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/navigationItems.js';
import classes from './sidedrawer.module.css';
import Backdrop from '../../../Ui/backdrop/backdrop';
import Aux from '../../../hoc/aux/aux';

const sidedrawer=(props)=>{
   
  let attachedClass=[classes.SideDrawer,classes.Close];

  if(props.open){
      attachedClass=[classes.SideDrawer,classes.Open]
  }

  return(
    <Aux>
        <Backdrop show={props.open} backdropClose={props.closeBackdrop}/>
        <div className={attachedClass.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav> 
        </div>
    </Aux>
  ) 
}

export default sidedrawer;