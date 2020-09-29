import { Card, CardActions, CardContent, Fab, Box, Button,List,ListItem,ListItemAvatar,Avatar,ListItemText,ListItemSecondaryAction,IconButton } from '@material-ui/core';
import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

class PlayList extends React.Component{
   

    render(){
        return(
            <React.Fragment>
                <Box style={{position:"relative",border:"5px solid",borderRadius:"10px",margin:"10px 10px",height:"680px"}}>
                    <Box style={{display:"flex", flexDirection:"column",overflowY:"scroll",height:"100%"}}>
                        <List>
                            {(this.props.audioList).map((item,index)=>{
                                return(
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar style={{background:"#3f51b5"}}>
                                                <GraphicEqIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.fileName}
                                            secondary={item.time}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" index={index} onClick={this.props.setTarget}>
                                                <PlayCircleOutlineIcon />
                                            </IconButton>
                                            <IconButton edge="end" index={index} onClick={this.props.deleteAudio}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })} 
                        </List>
                        
                    </Box>
                    <Fab style={{position:"absolute",right:"18px",bottom:"5px"}} color="secondary" onClick={this.props.openUploadDialog}>
                        <AddIcon/>
                    </Fab>
                </Box>
            </React.Fragment>
        );
    }
}

export default PlayList;