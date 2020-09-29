import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, CardContent, Avatar, Typography, TextField, Button, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { GrGoogle } from 'react-icons/gr';
import axios from 'axios';
import cookie from 'react-cookies';
class App extends React.Component{
    constructor(){
        super();
        this.state={
            googleEmail:'',
            googleId:'',
            alert:{
                display:"none",
                message:'',
                flag:true
            }
        }
        
    }

    componentDidMount(){
        this.readGoogleInfo();
    }

    readGoogleInfo = () =>{
        var googleId = cookie.load('googleId');
        var googleEmail = cookie.load('googleEmail');
        this.setState({
            googleEmail:googleEmail,
            googleId:googleId,
        });
        if(googleEmail===''||googleId===''||googleEmail===undefined||googleId===undefined){
            this.showError("Failed to read GoogleInfo. Please back to last page and try again!");
            return false;
        }else{
            return true;
        }
    }

    checkGoogleInfo = () => {
        var googleEmail = this.state.googleEmail;
        var googleId = this.state.googleId;
        console.log(googleEmail);
        if(googleEmail===''||googleId===''||googleEmail===undefined||googleId===undefined){
            this.showError("Failed to read GoogleInfo. Please back to last page and try again!");
            return false;
        }else{
            return true;
        }
    }

    submit = () => {
        if(this.checkGoogleInfo()){
            axios
            .post("./associatedWithGoogle.action",JSON.stringify({
                email:this.state.googleEmail,
                type:'local&google',
                extraId:this.state.googleId
            }),{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            })
            .then(res =>{
                if(res.data.successFlag){
                    this.setState({
                        alert:{
                            display:"inline",
                            message:"Congratulation!You have associated successfully.Wait for 3s, We will jump to login page.",
                            flag:true
                        }
                    });
                    setTimeout(function(){
                        window.location.href='./reqlogin.html';
                    },3*1000);
                }else{
                    this.showError(res.data.message);
                }
            })
            .catch(err => {
                console.log(err); 
            });
        }
    }

    showError = (message) => {
        this.setState({
            alert:{
                display:"inline",
                message:message,
                flag:false
            }
        })
    }

    render(){
        return(
            <Grid container>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Box style={{display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                                <Avatar style={{background:'#FE6B8B'}}>
                                    <GrGoogle />
                                </Avatar>
                                <Typography component="h1" variant="h5" style={{margin:'5px auto'}}>
                                     Google Association For ICrowdTask
                                </Typography>
                                <Typography component="h2" variant="body2" style={{margin:'5px auto'}}>
                                The email has been registered in our website
                            Do you want to associate your google account with your loacl account?
                                </Typography>
                                <Alert style={{display:`${this.state.alert.display}`}} severity={(this.state.alert.flag)?"success":"error"}>{this.state.alert.message}</Alert>
                            </Box>
                            <form noValidate>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="googleEmail"
                                            label="Google Email"
                                            name="googleEmail"
                                            autoComplete="googleEmail"
                                            value={this.state.googleEmail||''}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="googleId"
                                            label="Google ID"
                                            name="googleId"
                                            autoComplete="googleId"
                                            value={this.state.googleId||''}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.submit}
                                >
                                    Yes!
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
            
        )
    }
}


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);