import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import './Navbar.css';
import { useAuth } from '../../hooks/useAuth';
import User from './User';

export default function Navbar(){
 
const {logout} = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
     
    } catch (error) {
      console.error(error.message);
    }  
    
  };

  return (
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='header'>
        <Toolbar>
        <Link to="/">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <img src="https://cdn.pixabay.com/photo/2016/12/26/18/33/logo-1932539_960_720.png" className='navImage' alt='logo'/>
         
          </IconButton>  
</Link>
<Typography sx={{ flexGrow: 82 }} className="itemMenu">
        <Link to="/"> <Button className='menu'>Home</Button></Link>
        <Link to="/productos"> <Button className='menu'>Productos</Button></Link>
          </Typography> 
          <Typography sx={{ flexGrow: 1}} component="div" className="welcome">
         <h4>Welcome</h4> <User/>  
          </Typography> 
        
  
<Link to="/sign-in">
          <Button color="inherit" textDecoration="none" className='button'     onClick={handleLogout}>{logout ? "Sign Out" : "Login"}</Button></Link>
          
  
     
    
        </Toolbar>
      </AppBar>
    </Box>
  );
}
