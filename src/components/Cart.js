import React from "react";
import "../App.css";
import fire from "../Fire";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";

import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  table: {
    minWidth: 700,
    maxWidth: "75%"
  }
}));

function Cart(props) {
  // Set page title
  React.useEffect(() => {
    document.title = "Fireplace Store :: Cart";
  }, []);

  const [allProducts, setAllProducts] = React.useState(props.cart);
  const classes = useStyles();

    const [updated, setUpdate] = React.useState({
        name: "",
        image: "",
        stock: null,
        shortDesc: "",
        price: null
    });


    const [showUpdate, toggleUpdate] = React.useState(false);
    const [showDelete, toggleDelete] = React.useState(false);

  React.useEffect(() => {}, [props.cart]);

    // open a connection to the database
    const db = fire.firestore();

  const deleteRow = idx => {
      toggleDelete(true);
    if (idx > -1) {
      props.cart.splice(idx, 1);
      setAllProducts(props.cart);
        toggleDelete(false);
    }
    console.log("delete");
  };

  const purchaseCart = event => {
    console.log("Purchase Cart");

      toggleUpdate(true);
allProducts.map((ele) => (
    db.collection("products")
        .doc(ele.id)
        .update({
            name: ele.name,
            image: ele.image,
            stock: ele.stock - 1,
            shortDesc: ele.shortDesc,
            price: ele.price,
        })
        .then(function() {
            setUpdate({
                name: "",
                image: "",
                stock: null,
                shortDesc: "",
                price: null
            });
            toggleUpdate(false);
        })));
      setAllProducts([]);
  };



  let productTable = allProducts.map((row, idx) => (
    <TableRow key={idx}>
      <TableCell component="th" scope="row">
        <Badge badgeContent={row.stock < 10 ? "Low Stock!" : 0} color="primary">
          <img src={row.image} style={{ width: "100px" }} alt={row.name} />
        </Badge>
      </TableCell>
      <TableCell align="right">{row.name}</TableCell>
      <TableCell align="right">${row.price}</TableCell>
      <TableCell align="right">
        {/*<Button*/}
        {/*    variant="contained"*/}
        {/*    color="primary"*/}
        {/*    onClick={() => updateOn(row.id)}*/}
        {/*>*/}
        <IconButton aria-label="delete" onClick={() => deleteRow(idx)}>
          <DeleteIcon />
        </IconButton>
        {/*</Button>*/}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <h2>Shopping Cart</h2>
      {allProducts.length <= 0 && <h3>No Products in Cart</h3>}
      {allProducts.length > 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            }
            <TableBody>
              {productTable}
              {allProducts.length > 0 && (
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={1}>Price</TableCell>
                  <TableCell align="right">
                    {allProducts
                      .map(({ price }) => price)
                      .reduce((sum, i) => sum + i, 0)}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {allProducts.length > 0 && (
        <Button variant="contained" onClick={purchaseCart}>
          Place Order
        </Button>
      )}
    </>
  );
}

export default Cart;
