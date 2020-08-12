import React, { Component } from 'react';
import Aux from '../../hoc/aux/aux';
import Modal from '../modal/modal';

const withError=(WrapperComponent,axios)=>{
    
    return class extends Component{

        componentWillMount(){
            this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })

            this.resInterceptor=axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err});
                return Promise.reject(err);
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
 
        state={
            error:null,
        }

        errorHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Aux>
                    <Modal 
                    show={this.state.error}
                    closeBackdrop={this.errorHandler}
                    >
                        {
                        this.state.error?this.state.error.message:null
                        }
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withError;