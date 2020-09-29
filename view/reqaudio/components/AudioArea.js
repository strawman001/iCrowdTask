import React from 'react';
import { Box, Typography} from '@material-ui/core';



class AudioArea extends React.Component{
     

    render(){
        const defaultArea = 
        <Box style={{height:"100%",width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="h3">
                Please select an audio
            </Typography>
        </Box>

        const audioArea = 
        <React.Fragment>
            <Box>
                <Typography variant="h2" style={{textAlign:"center"}}>
                {this.props.target.fileName}
                </Typography>
                <audio src={this.props.target.url} controls="controls" style={{width:"100%"}}></audio>
            </Box>
            <Box style={{overflowY:"auto"}}>
                <Typography variant="h6">
                    {this.props.target.transcript}
                </Typography>
            </Box>;
        </React.Fragment>       
        

        return(
            <React.Fragment>
                <Box style={{width:"100%",height:"680px"}}>
                    <Box style={{height:"100%",margin:"10px 30px",border:"5px solid",borderRadius:"10px"}}>
                        {(this.props.target.fileName==="")?defaultArea:audioArea}
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default AudioArea;