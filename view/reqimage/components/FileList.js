import { Card, CardActions, CardContent, Fab, Box, Button } from '@material-ui/core';
import React from 'react'
import AddIcon from '@material-ui/icons/Add';


class FileList extends React.Component{


    render(){
        return(
            <React.Fragment>
                <Box style={{display:"flex", flexDirection:"row",overflowX:"scroll",border:"5px solid",borderRadius:"10px",margin:"10px 10px"}}>
                    {(this.props.picList).map((item,index)=>{
                        return(
                            <Card key={item.key} style={{height:"200px",width:"200px",flexShrink:"0"}} >
                                <CardContent style={{textAlign:"center",height:"160px"}}>
                                    <img alt="" src={item.url} style={{objectFit:"contain", width:"100%",height:"100%"}}></img>
                                    {item.fileName}
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" style={{flexGrow:1}} index={index} onClick={this.props.setTarget}>
                                        {(item.flag)?"Show It":"Recognize It"}
                                    </Button>
                                    <Button size="small" color="secondary" style={{flexGrow:1}} index={index} onClick={this.props.deleteImage}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                    <Card style={{height:"200px",width:"200px",display:"flex",justifyContent:"center",alignItems:"center",flexShrink:"0"}}>
                        <CardContent>
                            <Fab color="primary" onClick={this.props.openUploadDialog}>
                                <AddIcon/>
                            </Fab>
                        </CardContent>
                    </Card>
                </Box>
            </React.Fragment>
        );
    }
}

export default FileList;