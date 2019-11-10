import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import history from "../../history";
import OrderCard from "./OrderCard";
import Header from '../Header';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  loadCircle: {
    marginTop: "10%",
    marginLeft: "45%"
  }
}));

const MyOrders = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const { isSignedIn, token } = useSelector(state => state.auth);
  const [filterList, setFilterList] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async (status, sortBy) => {
        try {
          const res = await axios({
            method: "get",
            url: "/order",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(token)
            },
            params: {
              shippingStatus: status.join(","),
              sort: sortBy
            }
          });
          const data = res.data.data;

          setOrderList(
            data.map(item => {
              const date = new Date(item.createdAt);
              const dateString =
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate() +
                " " +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds();

              var addresses = [
                item.address1,
                item.address2,
                item.city,
                item.zipCode,
                item.state,
                item.country
              ];
              addresses = addresses.filter(item => item !== "");

              return {
                date: dateString,
                orderID: item._id,
                paymentCard: item.paymentCard,
                name: item.receiverFirstName + " " + item.receiverLastName,
                shippingStatus: item.shippingStatus,
                totalPrice: item.totalPrice,
                toppings: item.toppings.join(", "),
                address: addresses.join(", "),
                burgerSize: item.burgerSize
              };
            })
          );

          setLoading(false);
        } catch (error) {
          console.log(error.response.data.error);
        }
      };

      fetchData(filterList, sortList);
    } else {
      history.push("/login");
    }
  }, [filterList, isSignedIn, sortList, token]);

  const handleFilterListChecked = e => {
    setLoading(true);
    const val = e.target.value;
    if (e.target.checked) {
      setFilterList([...filterList, val]);
    } else {
      setFilterList(filterList.filter(e => e !== val));
    }
  };

  const handleSortListChecked = e => {
    const val = e.target.value;
    if (e.target.checked) {
      setSortList([...sortList, val]);
    } else {
      setSortList(sortList.filter(e => e !== val));
    }
  };

  const renderMain = () => {
    if (loading) {
      return <CircularProgress className={classes.loadCircle} />;
    } else {
      return (
        <Box mt={4}>
          {orderList.map(component => (
            <OrderCard key={component.orderID} {...component} />
          ))}
        </Box>
      );
    }
  };

  const renderFilterBy = () => (
    <React.Fragment>
      <Typography variant="h6" color="textPrimary">
        Filter By
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={false}
              onChange={handleFilterListChecked}
              value="Unshipped"
              color="primary"
            />
          }
          label="Unshipped"
        />
        <FormControlLabel
          control={
            <Switch
              defaultChecked={false}
              onChange={handleFilterListChecked}
              value="Picking"
              color="primary"
            />
          }
          label="Picking"
        />
        <FormControlLabel
          control={
            <Switch
              defaultChecked={false}
              onChange={handleFilterListChecked}
              value="In Transit"
              color="primary"
            />
          }
          label="In Transit"
        />
        <FormControlLabel
          control={
            <Switch defaultChecked={false} onChange={handleFilterListChecked} value="Delivered" />
          }
          label="Delivered"
        />
      </FormGroup>
    </React.Fragment>
  );

  const renderSortBy = () => (
    <React.Fragment>
      <Typography variant="h6" color="textPrimary">
        Sort By
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={false}
              onChange={handleSortListChecked}
              value="-createdAt"
              color="primary"
            />
          }
          label="Date"
        />
        <FormControlLabel
          control={
            <Switch defaultChecked={false} onChange={handleSortListChecked} value="totalPrice" />
          }
          label="Total Price"
        />
      </FormGroup>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Header />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" color="primary">
            My Orders
          </Typography>
          {renderFilterBy()}
          {renderSortBy()}
          {renderMain()}
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default MyOrders;
