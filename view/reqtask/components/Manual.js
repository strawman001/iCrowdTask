import { Box, AppBar, Tab, Typography } from '@material-ui/core';
import React from 'react';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import TranslateIcon from '@material-ui/icons/Translate';

class Manual extends React.Component{
    constructor(){
        super();
        this.state={
            value:"1"
        }
    }

    render(){
        return(
        <Box style={{margin:"20px 20px"}}>
            <TabContext value={this.state.value}>
                <AppBar position="static" color="default">
                    <TabList onChange={(e,value)=>{this.setState({value:value})}} aria-label="simple tabs example" centered>
                        <Tab label="Dashboard" value="1" icon={<DashboardIcon/>} style={{flexGrow:1}} />
                        <Tab label="ImageLearned" value="2" icon={<ImageIcon/>} style={{flexGrow:1}}/>
                        <Tab label="AudioToText" value="3" icon={<TranslateIcon/>} style={{flexGrow:1}}/>
                    </TabList>
                </AppBar>
                <TabPanel value="1" style={{boxShadow:"4px 4px 5px 3px #999",height:"200px"}}>
                    <Typography variant="h5">
                        Dashboard
                    </Typography>
                    <Typography variant="body1">
                        -Here: You can see your usage statistics<br/>
                        -Side Nav: Can help you go to other pages
                    </Typography>
                </TabPanel>
                <TabPanel value="2" style={{boxShadow:"4px 4px 5px 3px #999",height:"200px"}}>
                    <Typography variant="h5">
                        Image Learned
                    </Typography>
                    <Typography variant="body1">
                        -Upload: You can upload your own images<br/>
                        -Predict: Get the concepts from your images
                    </Typography>
                </TabPanel>
                <TabPanel value="3" style={{boxShadow:"4px 4px 5px 3px #999",height:"200px"}}>
                    <Typography variant="h5">
                        Audio To Text
                    </Typography>
                    <Typography variant="body1">
                        -Upload: You can upload your own audioes<br/>
                        -To Text: Can Shift the audio to text
                    </Typography>
                </TabPanel>
            </TabContext>
        </Box>
        );
    }
   
}

export default Manual;