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
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  table: {
    minWidth: 650,
    maxWidth: "75%"
  }
}));

function Admin() {
  React.useEffect(() => {
    document.title = "Fireplace Store :: Admin"
  }, []);

  const classes = useStyles();
  const [allProducts, setAllProducts] = React.useState([]);
  const [values, setValues] = React.useState({
    name: "",
    image: "",
    stock: null,
    shortDesc: "",
    price: null
  });
  const [updated, setUpdate] = React.useState({
    name: "",
    image: "",
    stock: null,
    shortDesc: "",
    price: null
  });
  const [changed, setChange] = React.useState(false);
  const [updateId, setId] = React.useState("");
  const [showUpdate, toggleUpdate] = React.useState(false);

  // open a connection to the database
  const db = fire.firestore();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submit = () => {
    db.collection("products").add(values);
    setChange(!changed);
  };
  // const deleteItem = id => {
  //   db.collection("products")
  //     .doc(id)
  //     .delete()
  //     .then(function() {
  //       setChange(!changed);
  //     });
  // };
  const handleUpdate = prop => event => {
    setUpdate({ ...updated, [prop]: event.target.value });
  };

  const submitUpdates = () => {
    db.collection("products")
      .doc(updateId)
      .update(updated)
      .then(function() {
        setUpdate({
          name: "",
          image: "",
          stock: null,
          shortDesc: "",
          price: null
        });
        toggleUpdate(false);
      });
  };

  const updateOn = id => {
    toggleUpdate(true);
    setId(id);
  };

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
        setAllProducts(newProducts);
      });
  }, [db, changed]);

  let productTable = allProducts.map((row, idx) => (
    <TableRow key={idx}>
      <TableCell component="th" scope="row">
        <img src={row.image} style={{ width: "100px" }} alt={row.name} />
      </TableCell>
      <TableCell align="right">{row.name}</TableCell>
      <TableCell align="right">{row.stock}</TableCell>
      <TableCell align="right">${row.price}</TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateOn(row.id)}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  ));
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{productTable}</TableBody>
        </Table>
      </TableContainer>
      <div>
        {!showUpdate && (
          <form className={classes.root} autoComplete="off">
            <h2>Add New Product</h2>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleChange("name")}
              required
            />
            <TextField
              id="image"
              label="Image Link"
              variant="outlined"
              onChange={handleChange("image")}
              required
            />
            <TextField
              id="shortDesc"
              label="Short Description"
              variant="outlined"
              onChange={handleChange("shortDesc")}
              required
            />
            <TextField
              id="stock"
              label="Stock Level"
              variant="outlined"
              onChange={handleChange("stock")}
              required
            />
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              onChange={handleChange("price")}
              required
            />
            <Button variant="contained" color="primary" onClick={submit}>
              Add New Product
            </Button>
          </form>
        )}

        {showUpdate && (
          <form className={classes.root} autoComplete="off">
            <h2>Update Product</h2>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleUpdate("name")}
              required
            />
            <TextField
              id="image"
              label="Image Link"
              variant="outlined"
              onChange={handleUpdate("image")}
              required
            />
            <TextField
              id="shortDesc"
              label="Short Description"
              variant="outlined"
              onChange={handleUpdate("shortDesc")}
              required
            />
            <TextField
              id="stock"
              label="Stock Level"
              variant="outlined"
              onChange={handleUpdate("stock")}
              required
            />
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              onChange={handleUpdate("price")}
              required
            />
            <Button variant="contained" color="primary" onClick={submitUpdates}>
              Update Product
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default Admin;
