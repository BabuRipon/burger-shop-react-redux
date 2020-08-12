import React, { Component } from 'react';
import classes from './layout.module.css'
import Toolbar from '../../component/navigation/toolbar/toolbar';
import Sidedrawer from '../../component/navigation/sidedrawer/sidedrawer';
import Aux from '../aux/aux';


class layout extends Component{

    state={
        showSideDrawer:false,
    }

    sideDrawerCloseHandler=()=>{
       this.setState((prevState)=>{
           return {showSideDrawer:!prevState.showSideDrawer}
       })
    }

    render(){
        return(
            <Aux>
                <Toolbar menuClicked={this.sideDrawerCloseHandler}/>
                <Sidedrawer open={this.state.showSideDrawer} closeBackdrop={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
             </Aux>
        )
    }
}

export default layout;