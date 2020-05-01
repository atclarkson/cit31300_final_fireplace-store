import React from "react";
import '../App.css';
import {NavLink, Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: 'auto'
    },
    linkText: {
        color: "white",
        textDecoration: "none",
    },
    title: {
        flexGrow: 0,
    },
}));

function Nav() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Fireplace Store
                    </Typography>
                    <div className={classes.menuButton}>
                        <Button color="inherit">
                            <Link className={classes.linkText} to={"/store"}>Store</Link>
                        </Button>
                        <Button color="inherit">
                            <Link className={classes.linkText} to={"/cart"}>Cart</Link>
                        </Button>

                        <Button color="secondary" >
                            <Link className={classes.linkText} to={"/admin"}>Admin</Link>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Nav