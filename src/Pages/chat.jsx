import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Badge,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemSecondaryAction,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles({
  chatContainer: {
    height: '90vh',
    display: 'flex',
    boxShadow: '0 0 10px rgba(0,0,0,0.15)',
    fontFamily: props => props.fontFamily,
    backgroundColor: props => (props.mode === 'dark' ? '#121212' : '#fff'),
    color: props => (props.mode === 'dark' ? '#eee' : '#222'),
    overflow: 'hidden',
  },
  chatsList: {
    width: 280,
    borderRight: props => (props.mode === 'dark' ? '1px solid #333' : '1px solid #ddd'),
    overflowY: 'auto',
    backgroundColor: props => (props.mode === 'dark' ? '#1e1e1e' : '#fafafa'),
    color: props => (props.mode === 'dark' ? '#eee' : '#222'),
    flexShrink: 0,
  },
  chatBox: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: props => props.chatBackground,
  },
  messagesContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: 20,
    color: props => (props.mode === 'dark' ? '#eee' : '#222'),
  },
  messageRow: {
    display: 'flex',
    marginBottom: 10,
  },
  messageBubble: {
    maxWidth: '60%',
    padding: '10px 15px',
    borderRadius: 20,
    fontSize: props => props.fontSize + 'px',
    fontFamily: props => props.fontFamily,
    color: '#000',
  },
  messageBubbleSent: {
    backgroundColor: props => props.sentColor,
    marginLeft: 'auto',
    borderTopRightRadius: 0,
    color: props => (props.mode === 'dark' ? '#000' : '#000'),
  },
  messageBubbleReceived: {
    backgroundColor: props => props.receivedColor,
    marginRight: 'auto',
    borderTopLeftRadius: 0,
    color: props => (props.mode === 'dark' ? '#000' : '#000'),
  },
  inputBox: {
    padding: '10px 15px',
    borderTop: props => (props.mode === 'dark' ? '1px solid #333' : '1px solid #ddd'),
    backgroundColor: props => (props.mode === 'dark' ? '#222' : '#f7f7f7'),
    display: 'flex',
    alignItems: 'center',
  },
  settingsPanel: {
    width: 300,
    borderLeft: props => (props.mode === 'dark' ? '1px solid #333' : '1px solid #ddd'),
    backgroundColor: props => (props.mode === 'dark' ? '#1e1e1e' : '#fafafa'),
    padding: '20px',
    color: props => (props.mode === 'dark' ? '#eee' : '#222'),
    flexShrink: 0,
    overflowY: 'auto',
    maxHeight: '90vh',
  },
  sectionTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: props => (props.mode === 'dark' ? '#bbb' : '#444'),
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    display: 'block',
    color: props => (props.mode === 'dark' ? '#ccc' : '#333'),
  },
  addChatButton: {
    margin: '10px auto',
    display: 'block',
  },
});

const initialChats = [
  {
    id: 1,
    name: 'ChatGPT',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    messages: [
      { id: 1, text: 'Hello! How can I assist you today?', sender: 'other' },
      { id: 2, text: 'I need help with coding', sender: 'me' },
    ],
  },
  {
    id: 2,
    name: 'Airtel Chat',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Airtel-New-Logo.svg/1200px-Airtel-New-Logo.svg.png',
    messages: [{ id: 1, text: 'Welcome to Airtel customer support. How can we help?', sender: 'other' }],
  },
];

const fonts = ['Arial', 'Courier New', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana'];

const colors = [
  '#dcf8c6',
  '#aed581',
  '#81d4fa',
  '#ffcc80',
  '#f48fb1',
  '#b39ddb',
  '#fff',
  '#222',
];

const Chat = () => {
  const [mode, setMode] = useState('light');
  const [chatBackground, setChatBackground] = useState('#e5ddd5');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(14);
  const [sentColor, setSentColor] = useState('#dcf8c6');
  const [receivedColor, setReceivedColor] = useState('#fff');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState({ name: '', avatar: '' });
  const [isEditing, setIsEditing] = useState(false);

  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const classes = useStyles({
    mode,
    chatBackground,
    fontFamily,
    fontSize,
    sentColor,
    receivedColor,
  });

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedChat) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { id: chat.messages.length + 1, text: newMessage.trim(), sender: 'me' }],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddChat = () => {
    if (currentChat.name.trim() === '') return;

    const newChat = {
      id: chats.length > 0 ? Math.max(...chats.map(chat => chat.id)) + 1 : 1,
      name: currentChat.name.trim(),
      avatar: currentChat.avatar || 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
      messages: [],
    };

    setChats([...chats, newChat]);
    resetChatForm();
    setSelectedChatId(newChat.id);
  };

  const handleUpdateChat = () => {
    if (currentChat.name.trim() === '') return;

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          name: currentChat.name.trim(),
          avatar: currentChat.avatar || chat.avatar,
        };
      }
      return chat;
    });

    setChats(updatedChats);
    resetChatForm();
  };

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    if (chatId === selectedChatId && updatedChats.length > 0) {
      setSelectedChatId(updatedChats[0].id);
    } else if (updatedChats.length === 0) {
      setSelectedChatId(null);
    }
  };

  const resetChatForm = () => {
    setCurrentChat({ name: '', avatar: '' });
    setIsEditing(false);
    setChatDialogOpen(false);
  };

  const openEditChatDialog = (chat) => {
    setCurrentChat({
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar
    });
    setIsEditing(true);
    setChatDialogOpen(true);
  };

  const generateRandomAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/200/200?random=${randomId}`;
  };

  return (
    <Box className={classes.chatContainer} m={2} component={Paper} elevation={4} borderRadius={3}>
      {/* Chats Sidebar */}
      <Box className={classes.chatsList}>
        <Typography
          variant="h6"
          align="center"
          p={2}
          style={{ borderBottom: `1px solid ${mode === 'dark' ? '#333' : '#ddd'}`, color: mode === 'dark' ? '#eee' : '#222' }}
        >
          Chat Boxes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className={classes.addChatButton}
          onClick={() => {
            setCurrentChat({ name: '', avatar: '' });
            setIsEditing(false);
            setChatDialogOpen(true);
          }}
        >
        </Button>
        <List>
          {chats.map(chat => (
            <React.Fragment key={chat.id}>
              <ListItem 
                button 
                selected={chat.id === selectedChatId} 
                onClick={() => setSelectedChatId(chat.id)}
              >
                <Badge color="secondary" variant="dot" invisible={chat.id !== selectedChatId}>
                  <Avatar src={chat.avatar} alt={chat.name} />
                </Badge>
                <ListItemText
                  primary={chat.name}
                  sx={{ marginLeft: 2, fontWeight: chat.id === selectedChatId ? 'bold' : 'normal', color: mode === 'dark' ? '#eee' : '#222' }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => openEditChatDialog(chat)}>
                    <EditIcon sx={{ color: mode === 'dark' ? '#eee' : '#222' }} />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteChat(chat.id)}>
                    <DeleteIcon sx={{ color: mode === 'dark' ? '#eee' : '#222' }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
       
      </Box>

      {/* Chat Window */}
      {selectedChat ? (
        <Box className={classes.chatBox}>
          <Box
            p={2}
            borderBottom={`1px solid ${mode === 'dark' ? '#333' : '#ddd'}`}
            bgcolor={mode === 'dark' ? '#222' : '#ededed'}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color={mode === 'dark' ? '#eee' : '#222'}
          >
            <Typography variant="h6">{selectedChat.name}</Typography>
            <IconButton
              aria-label="settings"
              onClick={() => setSettingsOpen(!settingsOpen)}
              sx={{ color: mode === 'dark' ? '#eee' : '#222' }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>

          <Box className={classes.messagesContainer}>
            {selectedChat.messages.map(msg => (
              <Box
                key={msg.id}
                className={classes.messageRow}
                justifyContent={msg.sender === 'me' ? 'flex-end' : 'flex-start'}
              >
                <Box
                  className={`${classes.messageBubble} ${
                    msg.sender === 'me' ? classes.messageBubbleSent : classes.messageBubbleReceived
                  }`}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Box className={classes.inputBox}>
            <TextField
              variant="outlined"
              placeholder="Type a message"
              fullWidth
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                bgcolor: mode === 'dark' ? '#333' : '#fff',
                borderRadius: 2,
                '& .MuiInputBase-input': { color: mode === 'dark' ? '#eee' : '#222' },
                mr: 1,
              }}
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={newMessage.trim() === ''}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box className={classes.chatBox} display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6" color="textSecondary">
            No chat selected. Create a new chat or select an existing one.
          </Typography>
        </Box>
      )}

      {/* Settings Panel */}
      {settingsOpen && (
        <Box className={classes.settingsPanel}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Settings
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={mode === 'dark'}
                onChange={() => setMode(prev => (prev === 'dark' ? 'light' : 'dark'))}
                color="primary"
              />
            }
            label="Dark Mode"
            sx={{ color: mode === 'dark' ? '#eee' : '#222' }}
          />

          <Typography className={classes.label}>Chat Background</Typography>
          <Select
            fullWidth
            value={chatBackground}
            onChange={e => setChatBackground(e.target.value)}
            sx={{ mb: 2, color: mode === 'dark' ? '#eee' : '#222' }}
          >
            {colors.map(color => (
              <MenuItem key={color} value={color}>
                <Box
                  sx={{
                    width: 30,
                    height: 20,
                    backgroundColor: color,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    display: 'inline-block',
                    mr: 1,
                  }}
                />
                {color}
              </MenuItem>
            ))}
          </Select>

          <Typography className={classes.label}>Sent Message Color</Typography>
          <Select
            fullWidth
            value={sentColor}
            onChange={e => setSentColor(e.target.value)}
            sx={{ mb: 2, color: mode === 'dark' ? '#eee' : '#222' }}
          >
            {colors.map(color => (
              <MenuItem key={color} value={color}>
                <Box
                  sx={{
                    width: 30,
                    height: 20,
                    backgroundColor: color,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    display: 'inline-block',
                    mr: 1,
                  }}
                />
                {color}
              </MenuItem>
            ))}
          </Select>

          <Typography className={classes.label}>Received Message Color</Typography>
          <Select
            fullWidth
            value={receivedColor}
            onChange={e => setReceivedColor(e.target.value)}
            sx={{ mb: 2, color: mode === 'dark' ? '#eee' : '#222' }}
          >
            {colors.map(color => (
              <MenuItem key={color} value={color}>
                <Box
                  sx={{
                    width: 30,
                    height: 20,
                    backgroundColor: color,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    display: 'inline-block',
                    mr: 1,
                  }}
                />
                {color}
              </MenuItem>
            ))}
          </Select>

          <Typography className={classes.label}>Font Family</Typography>
          <Select
            fullWidth
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
            sx={{ mb: 2, color: mode === 'dark' ? '#eee' : '#222' }}
          >
            {fonts.map(font => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </Select>

          <Typography className={classes.label}>Font Size: {fontSize}px</Typography>
          <Slider
            min={10}
            max={24}
            value={fontSize}
            onChange={(e, val) => setFontSize(val)}
            sx={{ mb: 2, color: mode === 'dark' ? '#90caf9' : '#1976d2' }}
          />

          <Button variant="contained" fullWidth onClick={() => setSettingsOpen(false)}>
            Close
          </Button>
        </Box>
      )}

      {/* Add/Edit Chat Dialog */}
      <Dialog open={chatDialogOpen} onClose={resetChatForm}>
        <DialogTitle>{isEditing ? 'Edit Chat' : 'Add New Chat'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Chat Name"
            type="text"
            fullWidth
            variant="standard"
            value={currentChat.name}
            onChange={e => setCurrentChat({...currentChat, name: e.target.value})}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar src={currentChat.avatar || 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png'} 
                    sx={{ width: 56, height: 56, mr: 2 }} />
            <Button 
              variant="outlined" 
              onClick={() => setCurrentChat({...currentChat, avatar: generateRandomAvatar()})}
            >
              Random Icon
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetChatForm}>Cancel</Button>
          <Button 
            onClick={isEditing ? handleUpdateChat : handleAddChat} 
            disabled={!currentChat.name.trim()}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Chat;