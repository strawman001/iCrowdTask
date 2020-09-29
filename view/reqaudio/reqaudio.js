import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Typography, Box, Drawer, AppBar, Toolbar, IconButton, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import NotificationsIcon from '@material-ui/icons/Notifications';
import OperationalItems from '../components/OperationItems';
import PlayList from './components/PlayList';
import AudioArea from './components/AudioArea';
import UploadDialog from './components/UploadDialog';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            audioList:[],
            target:{
                key:"",
                url:"",
                fileName:"",
                transcript:"",
                time:""
            },
            open:false,
            uploadStatus:"undo"
        }
        
    }

    componentDidMount(){
        this.getAudioList();
    }

    getAudioList = () => {
        axios
        .get("./getAudioList.action")
        .then(res =>{
            if(res.data.successFlag){
                this.setState({audioList:res.data.audioList});
            }else{
                alert('Cannot get audio list!');
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }

    setTarget = (e) => {
        var index = e.currentTarget.getAttribute("index");
        var target = (this.state.audioList)[index];
        this.setState({target:target});
    }

    deleteAudio = (e) => {
        var index = e.currentTarget.getAttribute("index");
        var target = (this.state.audioList)[index];
        axios
        .get("./deleteAudio.action/"+target.key)
        .then(res =>{
            if(res.data.successFlag){
                this.getAudioList();
            }else{
                alert('Cannot delete the audio!');
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }

    uploadAudio = (file) => {
        if(file==null||file==undefined||file==""||file.size==0){
            alert("Please choose file!");
            return;
        }else if(((file.name).slice((file.name).lastIndexOf(".")+1))!="mp3"){
            alert("Please choose .mp3 file!");
            return;
        }
        else if((file.size/ 1024)>4096){
            alert("4M is the limit!");
            return;
        }
        this.setState({uploadStatus:"doing"});

        var formData = new FormData();

        formData.append("file",file);
        formData.append("fileName",file.name);
        formData.append("fileSize",file.size);

        axios
        .post("./uploadAudio.action",formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
        .then(res =>{
            if(res.data.successFlag){
                this.setState({uploadStatus:"done"});
                this.getAudioList();
            }else{
                this.setState({uploadStatus:"undo"});
                alert('Something wrong!');
            }
        })
        .catch(err => {
            console.log(err); 
        });
        
    }

    openUploadDialog = () => {
        this.setState({open:true});
    }

    render(){
        return(
           <React.Fragment>
               <CssBaseline />
               <Box>
                    <AppBar position="absolute" style={{width:`calc(100% - 250px)`,height:"60px"}}>
                        <Toolbar>
                            <Typography component="h1" variant="h6" color="inherit" noWrap style={{flexGrow:1}}>
                                Speech To Text
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
               <Box style={{left:"250px",top:"60px",width:`calc(100% - 250px)`,height:'auto',position:'absolute'}}>
                    <Grid container >
                        <Grid xs={8} item>
                            <AudioArea target={this.state.target}/>
                        </Grid>
                        <Grid xs={4} item>
                            <PlayList audioList={this.state.audioList} openUploadDialog={this.openUploadDialog} setTarget={this.setTarget} deleteAudio={this.deleteAudio}/>
                        </Grid>
                    </Grid>
               </Box>
               <UploadDialog open={this.state.open} onClose={()=>{this.setState({open:false,uploadStatus:"undo"})}} uploadStatus={this.state.uploadStatus} upload={this.uploadAudio}/>
           </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
     document.getElementById('root')
 );
