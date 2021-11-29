import React, { Component } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {connect} from 'react-redux';
import {getDataMin,getDataHour,getDataWeek,
    setLoading,setData,setDataType,setValue,getData5Min,setFiveMin
    } from '../store/actions/DataAction'


class TimeSelector extends Component {
        //Function that trigger when clicked some time tab (1/5 min,hour,week)
      handleChange =async (event, newValue) => {
         await this.props.setLoading(true)
         //Set the presenting data by current value
         await this.props.setValue(newValue)
         console.log("new Value",newValue)
         console.log("current Value",this.props.data.value)
         console.log("loading",this.props.data.loading)
            if(this.props.data.value === 1){
                await this.props.getDataMin()

            } else 
            //If the value equal to 2 than present 5 minutes data
            if(this.props.data.value === 2){
                var fiveMin_temp=[]
                await this.props.getData5Min().then(()=>{
                //Convert the data of 1 minute to 5 minute
                for (var i = 0; i < this.props.data.fiveMin.data.length; i++) {
                    if (i % 5 === 0) {
                        fiveMin_temp.push(this.props.data.fiveMin.data[i]);
                    }
                  }
                  console.log(fiveMin_temp)
                })
                  await this.props.setFiveMin(fiveMin_temp)
            }
            else
         //If the value equal to 3 than present 1 hour data
            if (this.props.data.value === 3){
                await   this.props.getDataHour()
            }else 
         //If the value equal to 4 than present 1 week data  
            if (this.props.data.value === 4){
                await  this.props.getDataWeek()
            }
            await  this.props.setData(this.props.data.value)

     }

    render(){
        return(
            <div>
                    <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                        <Tabs
                            value={this.props.data.value}
                            onChange={this.handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value={1}  label="1 Minute" />
                            <Tab value={2} label="5 Minute"   />
                            <Tab value={3} label="1 Hour" />
                            <Tab value={4} label="1 Week"  />
                        </Tabs>
                        </Box>
                        </Box>
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
    setDataType,
    setValue,
    getData5Min,
    setFiveMin
})(TimeSelector)
