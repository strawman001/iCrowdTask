import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, CardContent, Avatar, Typography, TextField, Button, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import axios from 'axios';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            authCode:'',
            codebuttonStatus:true,//avaliable
            alert:{
                display:"none",
                message:'',
                flag:true
            }
        }
    }

    checkPasswordAndEmail = () => {
        var password = this.state.password;
        var confirmPassword = this.state.confirmPassword;
        var email = this.state.email;
        if(email===''){
            this.showError("Need to fill the EMAIL");
            return false;
        }else if(password.length<8){
            this.showError("PASSWORD should be at leasr 8 characters");
            return false;
        }else if(password!==confirmPassword){
            this.showError("PASSWORD and CONFIRMED PASSWORD should be same");
            return false;
        }else{
            return true;
        }
    }

    checkAuthCode = () => {
        var authCode = this.state.authCode;
        if(authCode===undefined||authCode===''){
            this.showError("Need to fill in AUTHCODE");
            return false;
        }else{
            return true;
        }
    }

    submit = () => {
        if(this.checkPasswordAndEmail()&&this.checkAuthCode()){
            axios
            .post("./forgetAndChangePassword.action",JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                confirmPassword:this.state.confirmPassword,
                authCode:this.state.authCode
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
                            message:"Change password successfully! After 3s, jump to login page!",
                            flag:true
                        }
                    })
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

    getAuthCode = () => {
        var email = this.state.email;
        if(this.checkPasswordAndEmail()){
            axios
            .get("./forgetPassword.action/"+email)
            .then(res=>{
                if(res.data.successFlag){
                    this.setState({codebuttonStatus:false});
                    var self = this;
                    setTimeout(function(){
                        self.setState({codebuttonStatus:true});
                    },30*1000);
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
                                    <LockOpenIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5" style={{margin:'5px auto'}}>
                                    ICrowdTask Forget Password
                                </Typography>
                                <Typography component="h2" variant="body2" style={{margin:'5px auto'}}>
                                Please fill in your email and new password.
                                Then click the "Get Auth Code" button, you can find the code in your mailbox. 
                                Fill back the auth code, then click "Finish" button.
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
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            value={this.state.email}
                                            onChange={e => {this.setState({email:e.target.value})}}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"
                                            autoComplete="password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={e => {this.setState({password:e.target.value})}}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="confirmPassword"
                                            label="Confirm password"
                                            name="confirmPassword"
                                            autoComplete="confirmPassword"
                                            type="password"
                                            value={this.state.confirmPassword}
                                            onChange={e => {this.setState({confirmPassword:e.target.value})}}
                                           
                                        />
                                    </Grid>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.getAuthCode}
                                        disabled={!(this.state.codebuttonStatus)}
                                    >
                                        {(this.state.codebuttonStatus)?"Get Auth Code":"Wait for 30s to try agin, please."}
                                    </Button>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="authCode"
                                            label="Auth Code"
                                            name="authCode"
                                            autoComplete="address"
                                            value={this.state.authCode}
                                            onChange={e => {this.setState({authCode:e.target.value})}}
                                          
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.submit}
                                >
                                    Finish
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
   <App />,
    document.getElementById('root')
);