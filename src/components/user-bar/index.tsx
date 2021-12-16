import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { useAppActions, useAppState } from "store";

interface IUserBarProps {}

const UserBar: React.FunctionComponent<IUserBarProps> = (props) => {
  const { user } = useAppState((s) => s.Auth);
  const { logout } = useAppActions((s) => s.Auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const nameFirstLetter = (user && user?.name && user.name[0]) || "";

  return (
    <div className='cursor-pointer rounded py-1 px-3'>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Box display='flex' gap={1} alignItems='center' onClick={(e) => handleClick(e)}>
          <Avatar sx={{ width: 30, height: 30 }}>{nameFirstLetter}</Avatar>
          {user?.name}
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 3.5,
            "& .MuiAvatar-root": {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem>
          <NavLink className='flex' to='/profile'>
            <Avatar /> Profile
          </NavLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserBar;
