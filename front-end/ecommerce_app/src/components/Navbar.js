import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Drawer,
  List, ListItem, ListItemText, Box, TextField, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left: Hamburger + App Name */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
              Ecommerce
            </Typography>
          </Box>

          {/* Middle: Search Input and Cart */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ backgroundColor: 'white', borderRadius: 1, minWidth: 250 }}
            />
            <Button variant="contained" color="secondary" onClick={handleSearch}>
              Search
            </Button>
            <IconButton color="inherit" component={Link} to="/cart" sx={{ ml: 1 }}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            <Typography variant="h6" sx={{ px: 2, py: 1 }}>
              Categories
            </Typography>
            {categories.map((category) => (
            <ListItem
                button
                key={category.id}
                component={Link}
                to={`/category/${category.categoryName}`}
            >
                <ListItemText
                primary={category.categoryName}
                primaryTypographyProps={{ style: { color: '#333' } }}
                />
            </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
