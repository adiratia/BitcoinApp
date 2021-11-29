
import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import History from '../components/History'
import Overview from '../components/Overview'
import {setLoading, setDataType} from '../store/actions/DataAction'


//Function that presenting History/Overview panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            value:0
        }
    }
  
    a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    //function that trigger when click on tab.
     handleChange =async(event, newValue) =>{
     await  this.props.setLoading(true)
       await this.setState({value:newValue});
      };

    render(){
        return(
            <div className='container'>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.value} onChange={this.handleChange}  aria-label="basic tabs example">
                    <Tab label="Overview" {...this.a11yProps(0)}  />
                    <Tab label="History" {...this.a11yProps(1)}  />
                </Tabs>
                </Box>
            <TabPanel value={this.state.value} index={0}>
                <Overview/>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                <History/>
            </TabPanel> 
        </Box>
            </div>
        )
    }


}
const mapStateToProps  = (state) => ({data:state.data })

export default connect(mapStateToProps, {   
setLoading,setDataType})(Navbar)

