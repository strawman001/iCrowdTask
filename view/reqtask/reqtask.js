import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Typography, Box, Drawer, AppBar, Toolbar, IconButton, CssBaseline, Dialog } from '@material-ui/core';
import axios from 'axios';
import NotificationsIcon from '@material-ui/icons/Notifications';
import OperationalItems from '../components/OperationItems';
import PersonalCard from './components/PersonalCard';
import Manual from './components/Manual';
import Chart from './components/Chart';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            profile:{
                name:'',
                country:'',
                email:"",
                city:""
            },
            option:{
                color: ['#FE6B8B'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['ImageNum', 'ImageLearnedNum', 'AudioNum', 'AudioTextNum']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['ImageNum', 'ImageLearnedNum', 'AudioNum', 'AudioTextNum']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [{
                    data: [0, 0, 0, 0],
                    type: 'bar',
                }]
            }
        }
        
    }

    componentDidMount(){
        var self = this;
        this.getProfile(function(data){
            self.setState({profile:data.profile});
        });

        this.getLogInfo(function(data){
            var logInfo = data.logInfo;
            var newOption = self.state.option;
            var newSeries = {series:[{
                data: [logInfo.imageNum, logInfo.imageLearnedNum, logInfo.audioNum, logInfo.audioShiftedNum],
                type: 'bar',
            }]};
            Object.assign(newOption,newSeries);
            self.setState({
                option:newOption
            });
        });
        
    }

    getProfile = (callback) =>{
        axios
        .get("./getProfile.action")
        .then(res =>{
            if(res.data.successFlag){
                callback(res.data);
            }else{
                alert('Cannot get profile');
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }

    getLogInfo = (callback) =>{
        axios
        .get("./getLogInfo.action")
        .then(res =>{
            
            if(res.data.successFlag){
                callback(res.data);
            }else{
                alert('Cannot get logInfo');
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }

    render(){
        return(
           <React.Fragment>
               <CssBaseline />
               <Box>
                    <AppBar position="absolute" style={{width:`calc(100% - 250px)`,height:"60px"}}>
                        <Toolbar>
                            <Typography component="h1" variant="h6" color="inherit" noWrap style={{flexGrow:1}}>
                                Dashboard
                            </Typography>
                            <IconButton color="inherit">
                                <NotificationsIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                    >
                       <Box
                            style={{width:"250px"}}
                       >
                           <OperationalItems/>
                       </Box>
                    </Drawer> 
               </Box>
               <Box style={{left:"250px",top:"60px",width:`calc(100% - 250px)`,height: 'auto',overflow: 'auto',position:'absolute'}}>
                    <Grid container >
                        <Grid xs={4} item style={{height:"380px"}}>
                            <PersonalCard profile={this.state.profile}/>
                        </Grid>
                        <Grid xs={8} item style={{height:"380px"}}>
                            <Chart option={this.state.option}/>
                        </Grid>
                        <Grid xs={12} item>
                            <Manual/>
                        </Grid>
                    </Grid>
               </Box>
           </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);