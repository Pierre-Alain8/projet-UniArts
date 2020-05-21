import React, { useEffect } from "react";
import PropTypes from "prop-types";
import OfficeProfile from "./OfficeProfile";
import OfficeProjects from "./OfficeProjects";
import OfficeLinks from "./OfficeLinks";
import OfficeGallery from "./OfficeGallery";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
    width: "100%",
  },

  indicator: {
    backgroundColor: "rgba(255, 255, 255, .2)",
  },

  labelTab: {
    fontFamily: ["Source Sans Pro", "sans-serif"],
    fontSize: "1em",
  },
}));

const TabsOfficeUser = (props) => {
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) props.history.push("/");
  });

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
    <section className="tabOffice">
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
              label="COMPTE"
              {...a11yProps(0)}
            />
            <Tab
              className={classes.labelTab}
              label="PROJETS"
              {...a11yProps(1)}
            />
            <Tab className={classes.labelTab} label="LIENS" {...a11yProps(2)} />
            <Tab
              className={classes.labelTab}
              label="GALLERIE"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <OfficeProfile />
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <OfficeProjects />
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <OfficeLinks />
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <OfficeGallery />
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

export default TabsOfficeUser;
