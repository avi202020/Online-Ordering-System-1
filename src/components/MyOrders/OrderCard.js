import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    marginTop: 15
  },
  title: {
    fontSize: 14,
    display: "flex",
    justifyContent: "space-between"
  },
  content: {
    marginTop: -25,
    display: "flex",
    justifyContent: "space-between"
  },
  contentLeft: {
    width: "60%"
  },
  toppings: {
    overflowWrap: "break-word"
  },
  footer: {
    marginTop: -15
  }
});

const OrderCard = ({
  date,
  orderID,
  paymentCard,
  name,
  shippingStatus,
  totalPrice,
  toppings,
  address,
  burgerSize
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.title}>
        <Typography color="textSecondary">
          Date: {date}
          <br />
          Order ID: {orderID}
        </Typography>
        <Typography color={shippingStatus==="Delivered"?"secondary":"primary"} variant="overline">
          {shippingStatus}
        </Typography>
      </CardContent>
      <CardContent className={classes.content}>
        <div className={classes.contentLeft}>
          <Typography variant="h5" component="h4">
            Burger ({burgerSize})
          </Typography>
          <Typography component="p" className={classes.toppings} color="textSecondary">
            {toppings}
          </Typography>
        </div>
        <Typography variant="h5" component="h4" color="primary">
          ${totalPrice}
        </Typography>
      </CardContent>
      <CardContent className={classes.footer}>
        <Typography variant="h6">{name}</Typography>
        <Typography component="p" color="textSecondary">
          Shipping address: {address}
          <br />
          Payment Card: {paymentCard}
        </Typography>
      </CardContent>
    </Card>
  );
};

OrderCard.propTypes = {
  date: PropTypes.string.isRequired,
  orderID: PropTypes.string.isRequired,
  paymentCard: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shippingStatus: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  toppings: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  burgerSize: PropTypes.string.isRequired
};

export default OrderCard;
