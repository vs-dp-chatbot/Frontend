import React, { useState } from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import ChatRoom from './ChatRoom';
import btnAddIcon from '../assets/icon/btnAdd.png';
import logoIcon from '../assets/icon/visang.png';
import dataIcon from '../assets/icon/datahub.png';

const App = () => {
    const [chatRooms, setChatRooms] = useState([{ id: 1, name: 'Chat Room 1', messages: [], categorySelected: false }]);
    const [currentRoomId, setCurrentRoomId] = useState(1);

    const addChatRoom = () => {
        const newRoom = {
            id: chatRooms.length + 1,
            name: `Chat Room ${chatRooms.length + 1}`,
            messages: [],
            categorySelected: false,
        };
        setChatRooms([...chatRooms, newRoom]);
        setCurrentRoomId(newRoom.id);
    };

    const updateMessages = (roomId, newMessages) => {
        setChatRooms(chatRooms.map(room => room.id === roomId ? { ...room, messages: newMessages } : room));
    };

    const updateRoomName = (roomId, newName) => {
        setChatRooms(chatRooms.map(room => room.id === roomId ? { ...room, name: newName, categorySelected: true } : room));
    };

    const openDatahub = () => {
        window.open('http://vs-dpc-alb-01-487593038.ap-northeast-2.elb.amazonaws.com:9002/login?redirect_uri=%2F', '_blank');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: '#F5F6FB' }}>
            <Box sx={{ width: 220, padding: 2, backgroundColor: '#FFFFFF', borderRadius: '0px 30px 30px 0px', position: 'relative', boxShadow: 3 }}>
                <img src={logoIcon} alt="visang" style={{ width: '8.1875rem', height: '4.75rem' }} />
                <Button onClick={addChatRoom} sx={{ marginTop: 2, padding: 1 }}>
                    <img src={btnAddIcon} alt="Add Button" />
                </Button>
                <List sx={{ padding: '0 10px' }}>
                    {chatRooms.map((room) => (
                        <ListItem
                            key={room.id}
                            onClick={() => setCurrentRoomId(room.id)}
                            sx={{
                                padding: 1,
                                cursor: 'pointer',
                                marginTop: 1,
                                borderRadius: 1,
                                backgroundColor: room.id === currentRoomId ? '#F5F6FB' : 'transparent',
                                color: room.id === currentRoomId ? '#333' : 'inherit',
                                boxShadow: room.id === currentRoomId ? '0px 0px 15px 0px rgba(245, 246, 251, 0.1)' : 'none',
                                '&:hover': {
                                    backgroundColor: '#ddd',
                                },
                            }}
                        >
                            {room.name}
                        </ListItem>
                    ))}
                </List>
                <img onClick={openDatahub} src={dataIcon} alt="datahub link" style={{ position: 'absolute', bottom: 20, width: 'calc(100% - 80px)', cursor: 'pointer' }} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', overflow: 'hidden' }}>
                <ChatRoom
                    key={currentRoomId}
                    roomId={currentRoomId}
                    roomName={chatRooms.find(room => room.id === currentRoomId).name}
                    messages={chatRooms.find(room => room.id === currentRoomId).messages}
                    categorySelected={chatRooms.find(room => room.id === currentRoomId).categorySelected}
                    updateMessages={updateMessages}
                    updateRoomName={updateRoomName}
                />
            </Box>
        </Box>
    );
}

export default App;
