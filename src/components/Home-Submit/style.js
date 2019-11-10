import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    marginTop: "20px",
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  title: {
    fontSize: "30px",
    fontWeight: "600",
    margin: "0 20px",
    color: "gray",
    padding: theme.spacing(2, 2)
  },
  sum: {
    margin: "20px 35px",
    padding: theme.spacing(0, 2)
  },
  group: {
    width: "100%",
    maxWidth: "90%",
    backgroundColor: theme.palette.background.paper,
    margin: "0 20px",
    padding: theme.spacing(0, 2),
  },
  groupToppings: {
    marginLeft: "35px"
  },
  button: {
    margin: "15px 0 30px 30px",
    fontSize: "30px"
  }
}));
