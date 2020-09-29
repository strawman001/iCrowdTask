import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, CardContent, Avatar, Typography, TextField, Button, Box, MenuItem, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { GrGoogle } from 'react-icons/gr';
import axios from 'axios';
import cookie from 'react-cookies';
import countries from './countries'
class App extends React.Component{
    constructor(){
        super();
        this.state={
            countries:countries,
            country:'',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            address:'',
            additionalAddress:'',
            city:'',
            state:'',
            postalCode:'',
            mobilePhoneNumber:'',
            extraId:'',
            type:'local&google',
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
            email:googleEmail,
            extraId:googleId,
        });
        if(googleEmail===''||googleId===''||googleEmail===undefined||googleId===undefined){
            this.showError("Failed to read GoogleInfo. Please back to last page and try again!");
            return false;
        }else{
            return true;
        }
    }

    checkGoogleInfo = () => {
        var googleEmail = this.state.email;
        var googleId = this.state.extraId;
        if(googleEmail===''||googleId===''||googleEmail===undefined||googleId===undefined){
            this.showError("Failed to read GoogleInfo. Please back to last page and try again!");
            return false;
        }else{
            return true;
        }
    }
   
    check = () => {
        window.scrollTo(0,0);
        if(this.state.country===''){
            this.showError('Please select your COUNTRY');
            return false;
        }else if(this.state.firstName===''){
            this.showError('Please fill in your FIRST NAME');
            return false;
        }else if(this.state.lastName===''){
            this.showError('Please fill in your Last NAME');
            return false;
        }else if(this.state.email===''){
            this.showError('Please fill in your EMAIL');
            return false;
        }else if(this.state.password===''){
            this.showError('Please fill in your PASSWORD');
            return false;
        }else if(this.state.confirmPassword===''){
            this.showError('Please confirm your PASSWORD');
            return false;
        }else if(this.state.address===''){
            this.showError('Please fill in your ADDRESS');
            return false;
        }else if(this.state.city===''){
            this.showError('Please fill in your CITY');
            return false;
        }else if(this.state.state===''){
            this.showError('Please fill in your STATE/PROVINCE/REGION');
            return false;
        }else if(!(this.state.password===this.state.confirmPassword)){
            this.showError('PASSWORD and CONFIRMED PASSWORD should be same');
            return false;
        }else if(!(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/).test(this.state.email)){
            this.showError('EMAIL format is wrong');
            return false;
        }else if(this.state.password.length<8){
            this.showError('PASSWORD should be at leasr 8 characters');
            return false;
        }else if(this.state.mobilePhoneNumber!==''&&(!(/^[0-9]+$/).test(this.state.mobilePhoneNumber))){
            this.showError('PHONE NUMBER format is wrong');
            return false;
        }else{
            return true;
        }
    }

    submit = () => {
        if(this.checkGoogleInfo()&&this.check()){
            axios
            .post("./registerByGoogle.action",JSON.stringify({
                country:this.state.country,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                password:this.state.password,
                confirmPassword:this.state.confirmPassword,
                address:this.state.address+this.state.additionalAddress+"",
                city:this.state.city,
                province:this.state.state,
                postalCode:this.state.postalCode,
                phoneNumber:this.state.mobilePhoneNumber,
                type:this.state.type, 
                extraId:this.state.extraId    
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
                            message:"Congratulation! You have registered successfully.Wait for 3s, We will jump to login page.",
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
                                     Google Sign Up For ICrowdTask
                                </Typography>
                                <Typography component="h2" variant="body2" style={{margin:'5px auto'}}>
                                The email has been registered in our website.
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
                                            id="email"
                                            label="Google Email"
                                            name="email"
                                            autoComplete="email"
                                            value={this.state.email||''}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="extraId"
                                            label="Google ID"
                                            name="extraId"
                                            autoComplete="extraId"
                                            value={this.state.extraId||''}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="country"
                                            select
                                            label="Country of residence"
                                            value={this.state.country}
                                            onChange={e=>{this.setState({country:e.target.value})}}
                                            >
                                            {(this.state.countries).map((option) => (
                                                <MenuItem key={option.code} value={option.name}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First name"
                                            name="firstName"
                                            autoComplete="firstName"
                                            value={this.state.firstName}
                                            onChange={e => {this.setState({firstName:e.target.value})}}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last name"
                                            name="lastName"
                                            autoComplete="lastName"
                                            value={this.state.lastName}
                                            onChange={e => {this.setState({lastName:e.target.value})}}
                                            
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
                                            type="password"
                                            name="password"
                                            autoComplete="password"
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
                                            type="password"
                                            name="confirmPassword"
                                            autoComplete="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={e => {this.setState({confirmPassword:e.target.value})}}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            name="address"
                                            autoComplete="address"
                                            value={this.state.address}
                                            onChange={e => {this.setState({address:e.target.value})}}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="additionalAddress"
                                            label="Additional address"
                                            name="additionalAddress"
                                            autoComplete="additionalAddress"
                                            value={this.state.additionalAddress}
                                            onChange={e => {this.setState({additionalAddress:e.target.value})}}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="city"
                                            label="City"
                                            name="city"
                                            autoComplete="city"
                                            value={this.state.city}
                                            onChange={e => {this.setState({city:e.target.value})}}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="state"
                                            label="State, Province or Region"
                                            name="state"
                                            autoComplete="state"
                                            value={this.state.state}
                                            onChange={e => {this.setState({state:e.target.value})}}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="postalCode"
                                            label="ZIP / Postal code"
                                            name="postalCode"
                                            autoComplete="postalCode"
                                            value={this.state.postalCode}
                                            onChange={e => {this.setState({postalCode:e.target.value})}}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="mobilePhoneNumber"
                                            label="Mobile phone number"
                                            name="mobilePhoneNumber"
                                            autoComplete="mobilePhoneNumber"
                                            value={this.state.mobilePhoneNumber}
                                            onChange={e => {this.setState({mobilePhoneNumber:e.target.value})}}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.submit}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                    <Link href="./reqlogin.html" variant="body2">
                                        Already have an account? Sign in
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
    <App/>,
    document.getElementById('root')
);

