import React, { Component } from "react";
import {connect} from 'react-redux';
import {getDataMin,getDataHour,getDataWeek,setLoading,setData,setValue,getData5Min} from '../store/actions/DataAction'
import Loader from "react-loader-spinner";
import { MDBDataTable } from 'mdbreact';
import '../styles/style.css'


import TimeSelector from "./timeSelector";


class History extends Component{

    async componentDidMount() {
        console.log( 'History componenet ' )
        console.log(" history current Value",this.props.data.value)
        await  this.props.setData(this.props.data.value)

            }
    //Add commas to numbers
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //Function that create the table data
    tableData = () =>{
        //Columns data
        let data = {columns: [
            {
                label: 'Date',
                field: 'date',
                sort: 'asc',
                width: 150
              },
              {
                label: 'High',
                field: 'high',
                sort: 'date',
                width: 270
              },
              {
                label: 'Low',
                field: 'low',
                sort: 'asc',
                width: 270
              },      {
                label: 'Open',
                field: 'open',
                sort: 'asc',
                width: 270
              },     {
                label: 'Close',
                field: 'close',
                sort: 'asc',
                width: 270
              },


        ], rows :[]
    }
    //Add data to rows
    this.props.data.data.data.forEach(d => {     
        data.rows.push({
            date:String(d.Date),
            high:this.numberWithCommas(String(d.High)),
            low:this.numberWithCommas(String(d.Low)),
            open:this.numberWithCommas(String(d.Open)),
            close: this.numberWithCommas(String(d.Close))
        })   
    }
        )
        return data
    }

    render(){

        return (
            <div>
                {this.props.data.loading ? 
                <Loader className= 'spinner'
                    type="Puff"
                    color="orange"
                    height={100}
                    width={100}
                />
                :
                <div>
                 <TimeSelector page="History"/>
                 <MDBDataTable
                        striped
                        bordered
                        small
                        order={['date', 'date' ]}
                        data={this.tableData()}
                 />             
                    </div>
            }
            </div>
        )
    }


}
//Map state to props 
const mapStateToProps  = (state) => ({data:state.data })

export default connect(mapStateToProps, { getDataMin,
    getDataHour,
    getDataWeek,
    setLoading,
    setData,
    getData5Min,
setValue})(History)