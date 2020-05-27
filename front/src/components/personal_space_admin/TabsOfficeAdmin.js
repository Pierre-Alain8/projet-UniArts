import React from "react";
import OfficeArticle from "./OfficeArticle";
import Artiste from "./Artiste";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box div={5}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E7EAEF",
    height: "60rem",
    width: "100%",
  },

  labelTab: {
    fontFamily: ["Source Sans Pro", "sans-serif"],
    fontSize: "1em",
  },
}));

const TabsOfficeAdmin = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <section className="office-admin">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor={classes.indicator}
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              className={classes.labelTab}
              label="ARTICLES"
              {...a11yProps(0)}
            />
            <Tab className={classes.labelTab} label="USERS" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <OfficeArticle />
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Artiste />
          </TabPanel>
        </SwipeableViews>
      </div>
    </section>
  );
};

// propsType
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabsOfficeAdmin;
