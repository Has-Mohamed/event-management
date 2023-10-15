import { Collapse, FormControl, MenuItem, Select } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { DrawerHeader } from "../../Components/Shared/DrawerHeader";
import { FlexBox } from "../../Components/Shared/FlexBox";
import { ReactComponent as EllipseIcon } from "../../assets/images/Ellipse6.svg";
import { ReactComponent as Notifications } from "../../assets/images/Notifications24.svg";
import { ReactComponent as AttendeesIcon } from "../../assets/images/attendees24.svg";
import { ReactComponent as ChevronDownIcon } from "../../assets/images/chevron-down24.svg";
import { ReactComponent as ChevronIcon } from "../../assets/images/chevron-icon.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home24.svg";
import leagueIcon from "../../assets/images/league-icon.png";
import { ReactComponent as PlanningIcon } from "../../assets/images/planning24.svg";
import profile from "../../assets/images/profile.png";
import { ReactComponent as SettingsIcon } from "../../assets/images/settings24.svg";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundImage:
    "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
  paddingInline: "24px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundImage:
    "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
  paddingInline: "24px",
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "& .MuiToolbar-root": {
    justifyContent: "space-between",
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .active-link": {
    backgroundColor: theme.palette.action.hover,
    "& > div": {
      backgroundColor: "inherit",
    },
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  "& .MuiListItemButton-root": {
    // paddingInline:0
  },
}));

const Form = styled(FormControl)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& .MuiSelect-select": {
    padding: 8,
    display: "flex",
  },
}));

export default function MiniDrawer() {
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [openSubList, setOpenSublist] = React.useState(true);

  const handleSubListToggle = () => {
    setOpenSublist((prev) => !prev);
  };
  const handleDrawerToggle = () => {
    if (openDrawer) setOpenSublist(false);
    setOpenDrawer((prev) => !prev);
  };

  const ListItems = [
    {
      text: "Home",
      icon: HomeIcon,
      subItem: null,
      id: 1,
    },
    {
      id: 2,
      text: "Planning",
      icon: PlanningIcon,
      subItem: [
        {
          id: 21,
          text: "Sessions",
          icon: EllipseIcon,
          disable: false,
          path: "sessions",
        },
        { id: 22, text: "Venues", icon: EllipseIcon, disable: true, path: "" },
      ],
    },
    {
      id: 3,
      text: "Attendees",
      icon: AttendeesIcon,
      subItem: [],
    },
    {
      id: 4,
      text: "Settings",
      icon: SettingsIcon,
      subItem: [],
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <FlexBox>
            <Typography
              sx={{
                fontFamily: "'Josefin Sans'",
                fontSize: " 23px",
                fontWeight: 400,
                lineHeight: "23px",
              }}
            >
              Evently
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginInlineStart: 11,
                //   ...(open && { display: "none" }),
              }}
            >
              <ChevronIcon
                style={{ ...(!openDrawer && { transform: "rotate(180deg)" }) }}
              />
            </IconButton>
          </FlexBox>
          <Form variant="filled" size="small" sx={{ minWidth: "380px" }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={10}
              disableUnderline
              sx={{ borderRadius: 0 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>
                <Box
                  component="img"
                  src={leagueIcon}
                  alt="League Icon"
                  sx={{ marginInlineEnd: 1 }}
                />
                Champions’ League 2023
              </MenuItem>
            </Select>
          </Form>

          <FlexBox sx={{ gap: 1, borderRadius: 0 }}>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ bgcolor: "#ffffff17",borderRadius:0 }}
            >
              <Notifications />
            </IconButton>
            <Form variant="filled" size="small" sx={{ maxWidth: "180px" }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={10}
                disableUnderline
                sx={{ borderRadius: 0 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>
                  <Box
                    component="img"
                    src={profile}
                    alt="profile Icon"
                    sx={{ marginInlineEnd: 1 }}
                  />
                  Jane Doev
                </MenuItem>
              </Select>
            </Form>
          </FlexBox>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={openDrawer}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          {ListItems.map(({ icon: Icon, subItem, text,id }, index) => (
            <ListItem  key={id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openDrawer ? "initial" : "center",
                  px: 1,
                }}
                onClick={subItem?.length > 0 ? handleSubListToggle : undefined}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openDrawer ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: openDrawer ? 1 : 0, color: "#989898" }}
                />
                {subItem && <ChevronDownIcon />}
              </ListItemButton>
              {subItem?.length > 0 && (
                <Collapse in={openSubList} timeout="auto" unmountOnExit>
                  <List component="div">
                    {subItem.map(
                      ({ icon: SubIcon, text: subText, disable, path,id:subId }) => (
                        <div key={subId}>
                          <NavLink
                            to={path}
                            style={{ textDecoration: "none" }}
                            className={({ isActive }) =>
                              isActive ? "active-link" : undefined
                            }
                          >
                            <ListItemButton disabled={disable}>
                              <ListItemIcon>
                                <SubIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={subText}
                                sx={{ color: "#989898" }}
                              />
                            </ListItemButton>
                          </NavLink>
                          {/* <Divider /> */}
                        </div>
                      )
                    )}
                  </List>
                </Collapse>
              )}
              <Divider />
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
      <div style={{ width: "100%" }}>
        <DrawerHeader></DrawerHeader>

        <Outlet />
      </div>
    </Box>
  );
}
