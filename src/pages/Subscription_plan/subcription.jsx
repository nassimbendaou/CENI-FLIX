import React from 'react';
import './subscription.css';
import { LOGO_URL, MOBILE_LOGO_URL } from "../../requests";
import CreditCard from '../../components/Credi_card/Credit_CardHOC'

//Importing bootstrap and other modules

import 'bootstrap/dist/css/bootstrap.min.css';

 class subscription extends React.Component {
  
    constructor(props) {
        
        super(props);
        this.state = { width: 0, height: 0 ,plan:'',basic: true,pro:true,premuim:true, plan_basic:<></>,plan_pro: <></>,plan_premuim:<></>,creditCard :<></>};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.handleView();
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }
      handleSub=(plan)=>{
          switch (plan){

            case 'basic':
                this.setState({basic : true,pro: false,premuim:false}, () =>{console.log(this.state); this.handleView();});
                this.forceUpdate()
                this.handleView();
                this.setState({creditCard :  <div className='card_form'>   <CreditCard props={this.props.location.state} type = "basic"/> </div> })
                this.forceUpdate();
                break;

            case 'pro':
                this.setState({basic : false,pro: true,premuim:false}, () => {console.log(this.state); this.handleView();})
                this.forceUpdate()
                this.setState({creditCard :  <div className='card_form'>   <CreditCard  props={this.props.location.state} type = "pro"/> </div> })
                this.forceUpdate()
                break;

           case 'premuim':
                this.setState({basic : false,pro: false,premuim:true}, () => {console.log(this.state); this.handleView();})
                this.forceUpdate()
                
                this.setState({creditCard :  <div className='card_form'>   <CreditCard  props={this.props.location.state} type= 'premuim'/> </div> })
                this.forceUpdate()
                break;

          }
          
         
      }
      handleView=()=>{
        if(this.state.basic){
            this.setState({plan_basic :         <div  className="col-lg-4 mb-5 mb-lg-0">
           <div  className="bg-white p-5 rounded-lg shadow plan">
             <h1  className="h6 text-uppercase font-weight-bold mb-4">Basic</h1>
             <h2  className="h1 font-weight-bold">$4.9<span  className="text-small font-weight-normal ml-2">/ month</span></h2>
 
             <div  className="custom-separator my-4 mx-auto bg"></div>
 
             <ul  className="list-unstyled my-5 text-small text-left">
               <li  className="mb-3">
                 <i  className="fa fa-check mr-2 text"></i>watch inlimited films and series</li>
               <li  className="mb-3">
                 <i  className="fa fa-check mr-2 text"></i>1 device</li>
               <li  className="mb-3 text-muted">
                 <i  className="fa fa-times mr-2"></i>
                 <del>Get discount on cinema tickets</del>
               </li>
             </ul>
             <button  onClick={()=>this.handleSub('basic')}  className="btn btn btn-block p-2 shadow rounded-pill"><p className="subs">Subscribe</p></button>
           </div>
         </div>});
        
       }else{
           this.setState({plan_basic : <></>});
       }
 
       if (this.state.pro){
         this.setState({plan_pro : <div  className="col-lg-4 mb-5 mb-lg-0">
             <div  className="bg-white p-5 rounded-lg shadow plan">
               <h1  className="h6 text-uppercase font-weight-bold mb-4">Pro</h1>
               <h2  className="h1 font-weight-bold">$7.9<span  className="text-small font-weight-normal ml-2">/ month</span></h2>
 
               <div  className="custom-separator my-4 mx-auto bg"></div>
 

               <ul  className="list-unstyled my-5 text-small text-left">
               <li  className="mb-3">
                 <i  className="fa fa-check mr-2 text"></i>watch inlimited films and series</li>
               <li  className="mb-3">
                 <i  className="fa fa-check mr-2 text"></i>2 devices</li>
               <li  className="mb-3 text-muted">
                 <i  className="fa fa-times mr-2"></i>
                 <del>Get discount on cinema tickets</del>
               </li>
             </ul>
               <button onClick={()=>this.handleSub('pro')}  className="btn btn btn-block p-2 shadow rounded-pill"><p className="subs">Subscribe</p></button>
             </div>
           </div>});
       }else{
             this.setState({plan_pro : <></>});
       }
 
       if(this.state.premuim){
         this.setState({ plan_premuim :  <div  className="col-lg-4">
         <div  className="bg-white p-5 rounded-lg shadow plan">
           <h1  className="h6 text-uppercase font-weight-bold mb-4">Premuim</h1>
           <h2  className="h1 font-weight-bold">$12.9<span  className="text-small font-weight-normal ml-2">/ month</span></h2>
 
           <div  className="custom-separator my-4 mx-auto bg"></div>
 

           <ul  className="list-unstyled my-5 text-small text-left">
               <li  className="mb-3">
                 <i  className="fa fa-check mr-2 text"></i>watch inlimited films and series</li>
               <li  className="mb-3">
                 <i  className="fa fa-check mr-2 text"></i>4 device</li>
               <li  className="mb-3 ">
                 <i  className="fa fa-check mr-2"></i>
                 Get discount on cinema tickets
               </li>
             </ul>
           <button onClick={()=>this.handleSub('premuim')}  className="btn btn btn-block p-2 shadow rounded-pill"><p className="subs">Subscribe</p></button>
         </div>
       </div>
         });
       }else{
         this.setState({plan_premuim : <></>});
       }
      }
  render() {

    return (
     
      <div className="maincontainer">
       <section>
          <div  className="container py-5">

            
            <header  className="text-center mb-5 text-white">
              <div  className="row">
                <div  className="col-lg-8 mx-auto">
                <img className="Navbar__logo" src={this.state.width >= 600 ? LOGO_URL : MOBILE_LOGO_URL} alt="" />
                  <h1>TvFlix pricing table</h1>
                </div>
              </div>
            </header>
           



            <div  className="row text-center align-items-end">
            {}
             {this.state.plan_basic}
             {this.state.plan_pro}
             {this.state.plan_premuim}
             {this.state.creditCard}
   
            
             
            

            </div>
          </div>
        </section>

      </div>
     
      
)
}
}

export default subscription;