import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

export default function Copyright() {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/SiteHuang">
          Online Burger -- @Designed by Site Huang
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
