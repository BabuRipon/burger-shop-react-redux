import React ,{Component}from 'react';
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../../store/action/index';
import {connect }from 'react-redux';

class Logout extends Component{

    componentDidMount(){
        this.props.onLogoutHandler()
    }

  render(){
      return <Redirect to="/" />
  }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onLogoutHandler:()=>dispatch(actionCreator.logOut()),
    }
}

export default connect(null,mapDispatchToProps)(Logout);

