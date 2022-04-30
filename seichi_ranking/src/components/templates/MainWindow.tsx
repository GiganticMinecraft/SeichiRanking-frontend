import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Tooltip,
  Container,
  Divider,
} from "@mui/material";
import AppBarExample from "../../components/templates/materials/AppBar";
import DrawerExample from "../../components/templates/materials/Drawer";
import Breadcrumbs from "../../components/templates/materials/Breadcrumbs";
import Copyright from "./materials/Copyright";
import Link from "next/link";
import { useRouter } from "next/router";
import { Ranking } from "./Ranking";

interface TabPanelProps {
  readonly children?: React.ReactNode;
  readonly index: number;
  readonly value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const previewNavTabsId = "preview-nav-tabs";
const tabs = [{ label: "HOME", link: "" }];

const MainWindow: React.FC<{}> = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();
      setTabIndex(tabs.findIndex(({ link }) => link === linkPath[0]));
    }
  }, [router]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleChange = (_: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBarExample onDrawerButtonClick={handleOpenDrawer} />
      <Tooltip title={`<AppBar color="primary">`} placement="left" arrow>
        <AppBar position="static" id={previewNavTabsId}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={true}
              aria-label="preview-window-tabs"
            >
              {tabs.map((tab, index) => (
                <Link href={`/${tab.link}`} key={tab.label} passHref>
                  <Tab label={tab.label} {...a11yProps(index)} />
                </Link>
              ))}
            </Tabs>
          </Box>
        </AppBar>
      </Tooltip>

      <Container sx={{ flex: 1 }}>
        <Breadcrumbs />
        <Divider />
        <Box sx={{ marginTop: "10%" }}>
          <DrawerExample open={drawerOpen} onClose={handleCloseDrawer} />
          {tabs.map((tab, index) => (
            <TabPanel key={tab.label} value={tabIndex} index={index}>
              <Ranking data={[]} />
            </TabPanel>
          ))}
        </Box>
      </Container>

      <footer>
        <Container sx={{ marginTop: "auto" }}>
          <Copyright />
        </Container>
      </footer>
    </Box>
  );
};

export default MainWindow;
