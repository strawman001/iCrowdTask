import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Typography, Box, Drawer, AppBar, Toolbar, IconButton, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import NotificationsIcon from '@material-ui/icons/Notifications';
import OperationalItems from '../components/OperationItems';
import FileList from './components/FileList';
import ShowWindow from './components/ShowWindow';
import UploadDialog from './components/UploadDialog';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            picList:[],
            target:{
                url:"",
                concepts:[]
            },
            open:false,
            uploadStatus:"undo"
        }
        
    }

    componentDidMount(){
        this.getImageList();
    }

    getImageList = () => {
        axios
        .get("./getImageList.action")
        .then(res =>{
            if(res.data.successFlag){
                this.setState({picList:res.data.picList});
            }else{
                alert('Cannot get image list!');
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }

    setTarget = (e) => {
        var index = e.currentTarget.getAttribute("index");
        var target = (this.state.picList)[index];
        var self = this;
        if(target.flag){
            this.setState({target:target});
        }else{
            this.setState({
                target:{
                    url:target.url,
                    concepts:[]
                }
            });
            this.recognizeImage(target,function(picItem){
                var newPicList = (self.state.picList).slice(0);
                newPicList[index]=picItem;
                self.setState({
                    picList:newPicList,
                    target:{
                        url:picItem.url,
                        concepts:picItem.concepts
                    }
                })
            })
        }
    }

    deleteImage = (e) => {
        var index = e.currentTarget.getAttribute("index");
        var target = (this.state.picList)[index];
        axios
        .get("./deleteImage.action/"+target.key)
        .then(res =>{
            if(res.data.successFlag){
                this.getImageList();
            }else{
                alert('Cannot delete the image!');
            }
        })
        .catch(err => {
            console.log(err); 
        });

    }

    recognizeImage = (target,callback) => {
        axios
        .post("./recognizeImage.action",JSON.stringify(target),{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        })
        .then(res =>{
            if(res.data.successFlag){
               callback(res.data.picItem);
            }else{
                alert('Recognize Failed!');
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }

    uploadPic = (file) => {
        if(file==null||file==undefined||file==""||file.size==0){
            alert("Please choose file!");
            return;
        }else if(((file.name).slice((file.name).lastIndexOf(".")+1))!="jpg"){
            alert("Please choose .jpg file!");
            return;
        }
        else if((file.size/ 1024)>2048){
            alert("2M is the limit!");
            return;
        }
        this.setState({uploadStatus:"doing"});

        var formData = new FormData();

        formData.append("file",file);
        formData.append("fileName",file.name);
        formData.append("fileSize",file.size);

        

        axios
        .post("./uploadImage.action",formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
        .then(res =>{
            if(res.data.successFlag){
                this.setState({uploadStatus:"done"});
                this.getImageList();
            }else{
                this.setState({uploadStatus:"undo"});
                alert('Upload Failed!');
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
                                Image
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
                        <Grid xs={12} item>
                            <ShowWindow target={this.state.target}/>
                        </Grid>
                        <Grid xs={12} item>
                            <FileList picList={this.state.picList} openUploadDialog={this.openUploadDialog} setTarget={this.setTarget} deleteImage={this.deleteImage}/>
                        </Grid>
                    </Grid>
               </Box>
               <UploadDialog open={this.state.open} onClose={()=>{this.setState({open:false,uploadStatus:"undo"})}} uploadStatus={this.state.uploadStatus} upload={this.uploadPic}/>
           </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
     document.getElementById('root')
 );
