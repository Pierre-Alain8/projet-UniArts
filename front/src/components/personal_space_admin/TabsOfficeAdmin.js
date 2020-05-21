import React from "react";
import OfficeArticle from "./OfficeArticle";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box div={3}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#E7EAEF",
    display: "flex",
    height: 590,
    width: "25rem",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },

  labelTab: {
    fontFamily: ["Source Sans Pro", "sans-serif"],
    fontSize: "1em",
  },
}));

const TabsOfficeAdmin = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.labelTab} label="ARTICLES" {...a11yProps(0)} />
        <Tab className={classes.labelTab} label="ARTISTES" {...a11yProps(1)} />
        <Tab
          className={classes.labelTab}
          label="Item Three"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <OfficeArticle />
      </TabPanel>
      <TabPanel value={value} index={1}>
        ARTISTES
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabsOfficeAdmin;
