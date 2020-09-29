import { Dialog, DialogActions, DialogContent, DialogTitle,Box,Typography,Button,LinearProgress } from '@material-ui/core'
import React from 'react'

class UploadDialog extends React.Component{
    constructor(){
        super();
        this.inputFileRef = React.createRef();
        this.state={
            fileValue:""
        }
    }

    close = () => {
        // console.log(this.inputFileRef);
        // console.log(this.inputFileRef.current);
        // console.log(this.inputFileRef.current.files[0]);
        // console.log(this.inputFileRef.current.files[0].name);
        // console.log(this.inputFileRef.current.files[0].size);
        // console.log(this.inputFileRef.current.value);
        this.props.onClose();
        this.setState({fileValue:""});
        
    }

    upload = () =>{
        this.props.upload(this.inputFileRef.current.files[0]);
    }


    render(){
        var tip = null;
        if(this.props.uploadStatus==="undo"){
            tip = ''
        }else if(this.props.uploadStatus==="doing"){
            tip = <LinearProgress />
        }else if(this.props.uploadStatus==="done"){
            tip = <Typography> Upload Finished! </Typography>
        }

        return(
            <Dialog open={this.props.open} onClose={this.close}>
                <DialogTitle>Upload Images</DialogTitle>
                <DialogContent>
                    <Box>
                        <input type="file" accept=".jpg" ref={this.inputFileRef} value={this.state.fileValue} onChange={e=>{this.setState({fileValue:e.target.value})}}/>
                        <Typography>{this.state.fileValue}</Typography>
                        {tip}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.upload}color="primary">
                        Upload
                    </Button> 
                    <Button onClick={this.close} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default UploadDialog;