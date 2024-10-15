'use client';

import * as React from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
} from '@mui/material';

const contacts = [
  {
    name: 'James Johnson',
    lastMessage: 'You: Ponojuce tud ma um ...',
    time: '7 minutes',
  },
  {
    name: 'Maria Hernandez',
    lastMessage: 'Jepume mekej helako ...',
    time: '3 minutes',
  },
  {
    name: 'David Smith',
    lastMessage: 'Bahus hu hitikh palori ...',
    time: '8 minutes',
  },
  {
    name: 'Maria Rodriguez',
    lastMessage: 'Hed nutepuy sutek em ...',
    time: '5 minutes',
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar: Contacts */}
      <Box
        sx={{
          width: '300px',
          borderRight: '1px solid #ccc',
          overflowY: 'auto',
        }}
      >
        <Box p={2}>
          <Typography variant="h6">Recent Chats</Typography>
          {contacts.map((contact, index) => (
            <Box key={index} display="flex" alignItems="center" py={1}>
              <Avatar sx={{ marginRight: 1 }}>{contact.name.charAt(0)}</Avatar>
              <Box>
                <Typography variant="body1">{contact.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {contact.lastMessage}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ marginLeft: 'auto' }}
                color="textSecondary"
              >
                {contact.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Paper
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
          }}
        >
          <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: 2 }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    background:
                      message.sender === 'user' ? '#e1ffc7' : '#f1f0f0',
                    borderRadius: '8px',
                    padding: '8px',
                    display: 'inline-block',
                  }}
                >
                  {message.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', p: 1 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{ ml: 1 }}
            >
              Send
            </Button>
          </Box>
        </Paper>

        {/* Media and Attachments Section */}
      </Box>
    </Box>
  );
}
