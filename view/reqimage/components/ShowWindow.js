import React from 'react';
import { Box, Grid, List, ListItem, ListItemText, ListSubheader,Typography,CircularProgress } from '@material-ui/core';



class ShowWindow extends React.Component{
     

    render(){
        const conceptList = 
        <List
            subheader={
                <ListSubheader component="div">
                    Concepts List
                </ListSubheader>
            }
            style={{overflowY:"scroll",height:"450px"}}
        >
            {(this.props.target.concepts).map((item,index)=>{
                return(
                    <ListItem key={index} button>
                        <ListItemText primary={`${item.name} : ${item.value}`}/>
                    </ListItem>
                )
            })}
        </List>
        const waitLable = 
        <Box style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexShrink:"0"}}>
            <CircularProgress/>
        </Box>
        

        const picBox = 
        <Grid container>
            <Grid item xs={9}>
                <Box style={{height:"450px",background:"#000000"}}>
                    <img alt="" src={this.props.target.url} style={{objectFit:"contain", width:"100%",height:"100%"}}/>
                </Box>
            </Grid>
            <Grid item xs={3}>
                {(this.props.target.concepts.length===0)?waitLable:conceptList}
            </Grid>
        </Grid>;

        const noPicBox = 
        <Box style={{height:"100%",width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="h3">
                Please select a picture
            </Typography>
        </Box>

        return(
            <React.Fragment>
                <Box style={{width:"100%",height:"450px"}}>
                    <Box style={{height:"100%",margin:"10px 30px",border:"5px solid",borderRadius:"10px"}}>
                        {(this.props.target.url==="")?noPicBox:picBox}
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default ShowWindow;