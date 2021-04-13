import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { GetContext } from '../context';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const { signup, login, googleSignIn } = GetContext();
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({})
    const onBlurHandler = (e) => {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    const loginHandler = async e => {
        e.preventDefault();
        try {
            await login(user.email, user.password)
            history.replace(from)
        } catch (err) {
            console.log(err);
        }
    }
    const signupHandler = async e => {
        e.preventDefault();
        try {
            await signup(user.email, user.password)
            history.replace(from)
        } catch (err) {
            console.log(err);
        }
    }
    const googleSignInHandler = async e => {
        try {
            await googleSignIn();
            history.replace(from);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper style={{ padding: 15 }}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">{pathname === '/login' ? 'Log in' : 'Sign up'}</Typography>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onBlur={onBlurHandler}
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onBlur={onBlurHandler}
                                    variant="standard"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {pathname === '/login' ? <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> : <FormControlLabel
                                    control={<Checkbox value="terms" color="primary" />}
                                    label="I accept terms and condition"
                                />}
                            </Grid>
                        </Grid>
                        {pathname === '/login' ? <Button
                            onClick={loginHandler}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log In
                            </Button> :
                            <Button
                                onClick={signupHandler}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign up
                            </Button>}
                    </form>
                    {pathname === '/login' ?
                        <Typography>Need an account <Link to='/signup'>Signup</Link></Typography> :
                        <Typography>Already have an account <Link to='/login'>Login</Link></Typography>}
                    <Typography>Or</Typography>
                    <Button onClick={googleSignInHandler} variant="outlined" color="primary">
                        Continue with Google
                    </Button>
                </div>
            </Paper>
        </Container>
    );
}
export default Login;