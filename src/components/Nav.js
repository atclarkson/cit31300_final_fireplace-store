import React from "react";
import '../App.css';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

function Nav(props) {
    const classes = useStyles();


    const [cartValue, setCartValue] = React.useState(props.cart.length);

    React.useEffect(() => {
        setCartValue(props.cart.length);
    }, [props.cart.length]);

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
                            <Link className={classes.linkText} to={"/cart"}>
                                <Badge badgeContent={cartValue} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </Link>
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