import React from 'react';
import Card from 'react-credit-cards';


import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  
} from './utils';
import { auth,createUserProfileDocument } from "../../firebase/firebaseUtils";
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';

export default class CreditCard extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
      console.log(this.props)
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment" style={{marginTop:20}}>
        <div className="App-payment">
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit} >
            <div className="form-group">
              <input  style={{marginTop:10}}
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small style={{color:"white"}}>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input style={{marginBottom:10}}

                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
               
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions"  style={{marginTop:10}}>
                <Link to={'/login'}>
              <button onClick={()=>{ console.log("ici",this.props.props.props)
                   auth.createUserWithEmailAndPassword(this.props.props.props.email, this.props.props.props.password).then(user=>{
                    createUserProfileDocument(user.user,{subscribe : 1, type : this.props.props.type})   
                })
  
                    
                  }}className="btn btn-primary btn-block">PAY</button></Link>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {window.location('/login')}
            </div>
          )}

        </div>

      </div>
    );
  }
}

