import { ListSubheader, List, ListItem, Link, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import TranslateIcon from '@material-ui/icons/Translate';
class OperationalItems extends React.Component{
    render(){
        return(
            <List
                component="nav"
                subheader={
                    <ListSubheader component="div">
                        Nav Bar
                    </ListSubheader>
            }>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Link href="./reqtask.html" color="inherit">
                            Dashboard
                        </Link>
                    } />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ImageIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Link href="./reqimage.html" color="inherit">
                            Image Recognition
                        </Link>
                    } />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <TranslateIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Link href="./reqaudio.html" color="inherit">
                            Audio To Text
                        </Link>
                    } />
                </ListItem>
            </List>
        );
    }
}

export default OperationalItems;