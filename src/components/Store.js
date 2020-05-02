import React from "react";
import "../App.css";
import fire from "../Fire";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275
  },
  container: {
    display: "flex",
    flexFlow: "row wrap",
    margin: 25,
    justifyContent: "space-around"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 25
  },
  media: {
    margin: 5,
    padding: 5,
    height: 350,
    maxWidth: 350
  }
});

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function Store(props) {

  React.useEffect(() => {
    document.title = "Fireplace Store :: Store"
  }, []);

  const classes = useStyles();
  const [products, setProducts] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [dialogProduct, setDialogProduct] = React.useState({
    name: "",
    image: "",
    stock: null,
    price: null,
    shortDesc: "",
    id: "",
  });

  // when picture is clicked. fire the dialog modal and set the current product to a holding product for display
  const handleClickOpen = (id) => {
    setOpen(true);
    setDialogProduct({
      name: products[id].name,
      image: products[id].image,
      stock: products[id].stock,
      price: products[id].price,
      shortDesc: products[id].shortDesc,
      id: products[id].id,
    })
  };

  // attached to close button, sets the status of open bool to false.
  const handleClose = () => {
    setOpen(false);
  };

  const addToCart = (value) => {
    props.updateCart(value);
    setOpen(false);
  };

  // open a connection to the database
  const db = fire.firestore();


  React.useEffect(() => {
    let newProducts = [];

    db.collection("products")
      .orderBy("name")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const object = doc.data();

          let product = {
            name: object.name,
            image: object.image,
            price: object.price,
            stock: object.stock,
            shortDesc: object.shortDesc,
            id: doc.id
          };

          if (product.image == null) {
            product.image =
              "https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/181/2019/09/09091628/Image-Coming-Soon.png";
          }
          newProducts.push(product);
        });
        setProducts(newProducts);
      });
  }, [db]);



  let productEles = products.map((product, idx) => (
    <div key={idx}>
      <Card
        className={`classes.root  ${
          product.stock > 100
            ? "red-back"
            : product.stock < 10
            ? "blue-back"
            : "black-back"
        }`}
        onClick={()=>handleClickOpen(idx)}
      >
        <CardActionArea
        >
          <CardMedia
            component="img"
            className={classes.media}
            image={product.image}
            title={product.name}
            alt={product.name}
          />
        </CardActionArea>
      </Card>
    </div>
  ));





  return (
    <div className={classes.container}>
      {productEles}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {dialogProduct.name}
        </DialogTitle>
        <DialogContent dividers>
          <img className="dialog-img" src={dialogProduct.image} alt={dialogProduct.name}/>
          <Typography gutterBottom>
            {dialogProduct.shortDesc}
          </Typography>
          {dialogProduct.price > 0 &&
          <Typography variant="h2" gutterBottom>
            ${dialogProduct.price}
          </Typography>}
          {dialogProduct.stock > 0&&
          <Typography gutterBottom>
            Only {dialogProduct.stock} left.  Order today!
            </Typography>}
        </DialogContent>
        <DialogActions>
          {dialogProduct.stock > 0&&

          <Button autoFocus onClick={()=>addToCart(dialogProduct)} color="primary">
            Add to Cart
          </Button>}

        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Store;
