import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Grid, Card, CardContent, Avatar, Typography, TextField, Button, Link, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { GrGoogle } from 'react-icons/gr';
import cookie from 'react-cookies';
import axios from 'axios';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            checkFlag:false,
            alert:{
                display:"none",
                message:'',
                flag:true
            }
        }
        this.readRememberedUserInfo();
    }

    readRememberedUserInfo = () => {
        var email = cookie.load('email');
        var password = cookie.load('password');
        if(email!=null && password !=null){
            this.state={
                email:email,
                password:password,
                checkFlag:true,
                alert:{
                    display:"none",
                    message:'',
                    flag:true
                }
            }
        }
    }

    removeUserInfo = () => {
        cookie.remove('email');
        cookie.remove('password');
    }

    saveUserInfo = () => {
        var email = this.state.email;
        var password = this.state.password;
        if(email===null||email===undefined||email===""||password===null||password===undefined||password===""){
            alert("EMAIL or PASSWORD cannot be empty!");
            this.setState({checkFlag:false});
        }else{
            cookie.save('email', email, { maxAge: 3600*24*7 });
            cookie.save('password', password, { maxAge: 3600*24*7 });
        }
    }

    setRemember = (e) => {
        var flag = e.target.checked;
        this.setState({checkFlag:flag});
        if(flag){
            this.saveUserInfo();
        }else{
            this.removeUserInfo();
        }
    }

    submit = () => {
        axios
        .post("./login.action",JSON.stringify({
            email:this.state.email,
            password:this.state.password
        }),{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        })
        .then(res =>{
            if(res.data.successFlag){
                window.location.href = '../task/reqtask.html';
            }else{
                this.setState({alert:{
                    display:"inline",
                    message:res.data.error,
                    flag:false
                }});
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }

    responseGoogle = (response) => {
        var id_token = response.getAuthResponse().id_token;
        var profile = response.getBasicProfile();
        axios
        .post("./acceptGoogleToken.action",JSON.stringify({
            email:profile.getEmail(),
            token:id_token
        }),{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        })
        .then(res =>{
            if(res.data.successFlag){
                window.location.href = '../task/reqtask.html';
            }else{
                if(res.data.statusCode=='404')
                    window.location.href = './reqsignup_google.html';
                else if(res.data.statusCode=='401'){
                    this.setState({alert:{
                        display:"inline",
                        message:res.data.message,
                        flag:false
                    }});
                }
                else if(res.data.statusCode=='400')
                    window.location.href = './reqassociate_google.html';
                
            }
        })
        .catch(err => {
            console.log(err); 
        });
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
                                <Typography component="h1" variant="h5">
                                    ICrowdTask Sign In
                                </Typography>
                                <Alert style={{display:`${this.state.alert.display}`}} severity={(this.state.alert.flag)?"success":"error"}>{this.state.alert.message}</Alert>
                            </Box>
                            <form noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={e => {this.setState({email:e.target.value})}}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={e => {this.setState({password:e.target.value})}}
                                />
                                <FormControlLabel
                                    control={<Checkbox 
                                        value="remember" 
                                        color="primary"
                                        checked={this.state.checkFlag}
                                        onChange={e => {this.setRemember(e)}} 
                                    />}
                                    label="Remember me"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.submit}
                                >
                                    Sign In
                                </Button>
                                <GoogleLogin
                                    clientId={"1034862045976-kru1n1ehenctbqak604ri16huhu0ij4p.apps.googleusercontent.com"}
                                    render={renderProps => (
                                        <Button 
                                        onClick={renderProps.onClick} 
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<GrGoogle/>}
                                        style={{margin:"10px auto"}}>
                                            Google Sign In
                                        </Button>
                                    )}
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                />
                                <Grid container>
                                    <Grid item xs>
                                    <Link href="./reqforget.html" variant="body2">
                                        Forgot password?
                                    </Link>
                                    </Grid>
                                    <Grid item>
                                    <Link href="./reqsignup.html" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                    </Grid>
                                </Grid>
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