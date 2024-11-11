import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "./css/Navbar.css";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import React from "react";
import Icon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Add } from "@mui/icons-material";
import { Checklist } from "@mui/icons-material";
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (route === "AddData") {
      navigate("/adddata");
    } else if (route === "ListOfData") {
      navigate("/listofdata");
    }
    setOpen(false);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["AddData", "ListOfData"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleNavigation(text);
              }}
            >
              <ListItemIcon>
                {index % 2 == 0 ? <Checklist /> : <Add />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div>
          <Button onClick={toggleDrawer(true)}>
            <Icon></Icon>
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <nav className="mt-2">
          <ul className="d-flex gap-3 ">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </Box>
    </>
  );
};

export default Navbar;
