import React, { Component } from "react";
import {connect} from 'react-redux';
import {getDataMin,getDataHour,getDataWeek,setLoading,setData,setDataType} from '../store/actions/DataAction'
import Loader from "react-loader-spinner";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import TimeSelector from "./timeSelector";

import '../styles/style.css'

class Overview extends Component{


    async componentDidMount() {
        console.log( 'Overview componenet ' )
        //Set the initial data that present (1 minute)
     if(this.props.data.value ===1){
            await this.props.getDataMin()
        }

        await this.props.setData(this.props.data.value)
        
      }

    render(){
      
            return (
                
            <div>
                {/*If the data still not fetched show spinner */}
                 { 
                 this.props.loading ? 
                <Loader className= 'spinner'
                    className='spinner'
                    type="Puff"
                    color="orange"
                    height={100}
                    width={100}
                />
                :
                    <div>
                    <TimeSelector page="Overview"/>
                  <LineChart width={1200} height={500} data = {this.props.data.data.data}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="Close" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
                </div>
    }
            </div>
        )
        }
    


}

const mapStateToProps  = (state) => ({data:state.data})

export default connect(mapStateToProps, {
    getDataMin,
    getDataHour,
    getDataWeek,
    setLoading,
    setData,
    setDataType
})(Overview)
