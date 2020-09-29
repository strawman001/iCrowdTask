import { CardContent, Card, Avatar, CardHeader, ListItem, ListItemText, List } from '@material-ui/core';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class PersonalCard extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Card style={{margin:"20px 20px",boxShadow:"4px 4px 5px 3px #999"}}>
                <CardHeader
                    avatar={
                    <Avatar style={{background:'#FE6B8B'}}>
                        <AccountCircleIcon/>
                    </Avatar>
                    }
                    title="User Profile"
                />
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText>
                                Name:{this.props.profile.name}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                Email:{this.props.profile.email}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                Country:{this.props.profile.country}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                City:{this.props.profile.city}
                            </ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default PersonalCard;