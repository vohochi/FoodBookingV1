'use client';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const SideBarManger = () => (
  <Box
    sx={{
      width: 240,
      flexShrink: 0,
      bgcolor: 'background.paper',
      padding: 2,
      borderRight: '1px solid #ddd',
    }}
  >
    <Typography variant="h6" gutterBottom>
      Filter by Category
    </Typography>
    <List>
      {['All', 'Fashion', 'Books', 'Toys', 'Electronics'].map((text, index) => (
        <ListItem button key={index}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Typography variant="h6" gutterBottom>
      Sort By
    </Typography>
    <List>
      {['Newest', 'Price: High-Low', 'Price: Low-High'].map((text, index) => (
        <ListItem button key={index}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default SideBarManger;
