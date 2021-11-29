import React, { Component } from "react";
import Loader from "react-loader-spinner";

import logo from '../images/btc.png';
import '../styles/style.css'

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {
                ws:null,
                //Websocket Data
                data:{
                    last:null,
                    chanage:null,
                    percentChange:null,
                    lastUpdate:null
                },
                color:'gray',
                //Loading Indicator
                isLoading:true,
                ifSend : false
        }
    }

    async componentDidMount() {
             let websocket = new WebSocket("wss://wstest.fxempire.com?token=btctothemoon");
            await this.setState({ws:websocket},()=>{
                // websocket onopen event listener
                this.state.ws.onopen = () => {
                    console.log("connected websocket header component");
                };
                // Get data from the websocket
                this.state.ws.onmessage = (message) => {
                    let data=JSON.parse(message.data)['cc-btc-usd-cccagg']
                     this.setState({data : {
                         last:data['last'],
                         chanage:Number(data['change']).toFixed(2),
                         percentChange:Number(data['percentChange']).toFixed(2),
                         lastUpdate:  new Date(data['lastUpdate']).toUTCString()
                     }},()=>{
                    })
                    //The color choice of the price
                    if(this.state.data.chanage > 0){
                        this.setState({color:'green'})
                    }
                    else{
                        this.setState({color:'red'})
                    }
                  };
                // websocket onclose event listener
                this.state.ws.onclose = e => {
                    console.log(
                        "Socket is closed."
                    );
                };
        
                // websocket onerror event listener
                this.state.ws.onerror = err => {
                    console.error(
                        "Socket encountered error: ",
                        err.message,
                        "Closing socket"
                    );
                    this.state.ws.close();
                };
            })

            setTimeout(
                () => this.setState({isLoading:false}), 
                2000
              );
             await this.setState({ifSend:true})
           
        };
        //check if websocket instance is closed
        check = () => {
            const { ws } = this.state.ws;
            if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); 
        };
        //Send message to the Websocket
        sendMessage= ()=>{
            try {
                if (this.state.ws.readyState === 1) {
                this.state.ws.send(
                    JSON.stringify(
                        {
                            type:"SUBSCRIBE",
                            instruments:["cc-btc-usd-cccagg"]
                        }
                    )       
                ) //send data to the server
             }
            } catch (error) {
                console.log(error) // catch error
            }
        
        }

        //Function that add commas to number
       numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        //Render function
        render() {

        return (
             <div className="container shadow-sm p-2 mb-3 bg-white rounded" > 

                 <div>
                    <div className="row">
                        <div className="col-sm ">
                            <div className= 'header'>
                                <img className = 'Logo' style={{height:'35x',width:'35px'}} src={logo} alt="Logo" />
                                <span  className= 'text' style = {{fontSize:'35px',fontWeight:'bold'}}>Bitcoin</span>
                            </div>
                            <hr className="hr-style"/>

                            <p className='text-style'>As of:{this.state.data.lastUpdate}</p>
                            { this.state.ifSend === true?
                                         this.sendMessage()
                                         :
                                         <div></div>
                                        }                         
                        </div>
                    <div className="col-sm">
                    </div>
                    <div className="col-sm">
                        { this.state.data.last === null ?
                        <Loader className= 'spinner2'
                            type="Puff"
                            color="orange"
                            height={30}
                            width={30}
                            />
                      :
                      <div>
                      <p style={{textAlign:'right' ,fontSize:'40px',fontWeight:'bold'}}>
                   {'$ '+ this.numberWithCommas(Number(this.state.data.last))}
                  </p>
                  <p style={{textAlign:'right', color:this.state.color,fontSize:'20px',fontWeight:'bold'}}>
                      {this.state.data.chanage}
                      {'   ('+this.state.data.percentChange+'%)'}
                  </p>
                  </div>
                        }        
                    </div>
                </div>
                </div>
                         
            </div>
            
        );
    }
}

export default Header