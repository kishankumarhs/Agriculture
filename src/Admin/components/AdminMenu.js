import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./AdminMenu.css";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Home, Menu, Shop } from "@mui/icons-material";
import { palette } from "@mui/system";
const AdminMenu = () => {
  const [isDrawerOpned, setisDrawerOpned] = useState(false);
  const closeDrawer = () => {
    setisDrawerOpned(false);
  };
  const toggleDrawerStatus = () => {
    setisDrawerOpned(true);
  };
  return (
    <div className="adminMenu  w-100 d-flex">
      <div
        className="container-fluid py-3 d-flex algin-items-center flex-row text-white "
        style={{ backgroundColor: "var(--secondary-dark)" }}
      >
        <div
          onClick={toggleDrawerStatus}
          style={{
            margin: "0 20px",
            display: "iniline-block",
            cursor: "pointer",
          }}
        >
          {!isDrawerOpned ? <Menu /> : null}
        </div>
      </div>

      <Drawer
        variant="temporary"
        sx={{
          background: "var(--secondary-main)",
        }}
        open={isDrawerOpned}
        onClose={closeDrawer}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "var(--secondary-main)",
          }}
        >
          <ListItem>
            <p className="fs-3 text-white text-capitalize">RoyalAgriculture</p>
          </ListItem>
          <Link to="/dashboard">
            <ListItem button key="Dashboard">
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/AdminProducts">
            <ListItem button key="Products">
              <ListItemIcon>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
          <Link to="/banners">
            <ListItem button key="banners">
              <ListItemIcon>
                <ViewCarouselIcon />
              </ListItemIcon>
              <ListItemText primary="Banners" />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      {/* <div className="admin__menu center w-100">
        <span className="admin__menu_items w-100">
          <Link to="/dashboard"> Dashboard</Link>
        </span>
        <span className="admin__menu_items">
          <Link to="/AdminProducts">Products</Link>
        </span>
        <span className="admin__menu_items">
          <Link to="/catogary">Catageris</Link>
        </span>
      </div> */}
    </div>
  );
};

export default AdminMenu;
