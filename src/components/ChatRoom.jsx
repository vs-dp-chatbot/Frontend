import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatGPT.css';
import Menu from "./Menu";
import btnSend from "../assets/icon/send.png";
import CategoryQuestionBox from "./CategoryQuestionBox";

const ChatRoom = ({ roomId, roomName, messages, categorySelected, updateMessages, updateRoomName }) => {
    const [input, setInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categorySelected ? roomName : null);

    const messagesContainerRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        updateMessages(roomId, newMessages);
        setInput('');

        const responseMessage = await getChatGPTResponse(input, selectedCategory, "");
        const updatedMessages = [...newMessages, { sender: 'chatgpt', text: '다음과 같은 데이터를 제안해드립니다. 각 테이블 명을 클릭하시면 테이블의 상세 정보를 확인할 수 있습니다.', response: responseMessage }];
        updateMessages(roomId, updatedMessages);
    };

    const getChatGPTResponse = async (userInput, company, domain) => {
        try {
            const response = await axios.post('http://3.36.105.47/home', {
                company: company,
                domain: domain,
                message: userInput,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching data from backend', error);
            return {};
        }
    };

    const handleRowClick = (urn) => {
        window.open(urn, '_blank', 'noopener,noreferrer');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        updateRoomName(roomId, category);
    };

    return (
        <div className="chat-container">
            {!selectedCategory ? (
                <Menu onCategorySelect={handleCategorySelect} />
            ) : (
                <>
                    <div className="messages-container" ref={messagesContainerRef}>
                        {selectedCategory && messages.length === 0 && (
                            <CategoryQuestionBox title={selectedCategory}/>
                        )}
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender === 'user' ? 'user-message' : 'chatgpt-message'}`}
                            >
                                {message.text}
                                {message.sender === 'chatgpt' && message.response && (
                                    <div className="data-table">
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table
                                                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-tableColor">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">Name</th>
                                                    <th scope="col" className="px-6 py-3">Name_Ko</th>
                                                    <th scope="col" className="px-6 py-3">Description</th>
                                                    <th scope="col" className="px-6 py-3">Domain</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {Object.keys(message.response).map((key) => (
                                                    <tr key={key}
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleRowClick(message.response[key].urn)}>
                                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{key}</td>
                                                        <td className="px-6 py-4">{message.response[key].name_ko}</td>
                                                        <td className="px-6 py-4">{message.response[key].description}</td>
                                                        <td className="px-6 py-4">{message.response[key].domain}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="input-container">
                        <div className="header"></div>
                        <div className="input-frame">
                            <textarea
                                type="text"
                                value={input}
                                className="input-field"
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="확인하고 싶은 데이터의 목적을 입력해주세요"
                            />
                            <button className="send-button" onClick={handleSendMessage}>
                                <img src={btnSend} alt="Send"/>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ChatRoom;
