import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            RepeatPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Repeat password'
                },
                value: '',
                validation: {
                    required: true,
                    isPasswordMatch: true
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        
    }
    
    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( rules.isPasswordMatch ) {
            isValid = value === this.state.controls.password.value && isValid;
        }
        
        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );  
    }
    // repeatPasswordChangeHandler = (event) => { 
    //         const updatedControl = {
    //             ...this.state.controls,
    //         RepeatPassword : {
    //                 ...this.state.RepeatPassword,
    //             value: event.target.value,
    //             valid: this.checkValidity( event.target.value, this.state.RepeatPassword.validation ),
    //             touched: true
    //         }
    //         }
    //         this.setState( { RepeatPassword: updatedControl } );
    // }

    submitHandler = ( event ) => {
        event.preventDefault();
        // if ( this.state.isSignup) {
        //     this.props.onAuth( this.state.controls.email.value, this.state.RepeatPassword.value, this.state.isSignup );
        // } else {
        //     this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
        // }
        this.props.onAuth( this.state.controls.email.value, this.state.controls.RepeatPassword.value, this.state.isSignup );
        
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );
    //    let repeatPassword = this.state.isSignup === true ? 
    //         <Input
    //         elementType={this.state.RepeatPassword.elementType}
    //         elementConfig={this.state.RepeatPassword.elementConfig}
    //         value={this.state.RepeatPassword.value}
    //         invalid={!this.state.RepeatPassword.valid}
    //         shouldValidate={this.state.RepeatPassword.validation}
    //         touched={this.state.RepeatPassword.touched}
    //         changed={( event ) => this.repeatPasswordChangeHandler( event )} />
    //     : null ;

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    {/* {repeatPassword} */}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );