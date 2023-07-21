import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const ChatBoxContainer = styled.div`
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
`;

const ChatBoxScroll = styled.div`
    max-height: 400px;
    overflow-y: auto;
    padding: 0 8px;
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const Header = styled.h1`
    font-size: 16px;
    margin-bottom: 8px;
    color: #333;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
    text-align: center;
`;

const Divider = styled.div`
    display: flex;
    align-items: center;
    margin: 8px 0;
`;

const DividerLine = styled.div`
    flex-grow: 1;
    height: 1px;
    background-color: #ccc;
`;

const DividerText = styled.span`
    margin: 0 8px;
    color: #888;
    font-size: 12px;
`;

function ChatBox({ user, selectedUser, messageList }) {
    const messageListRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight;
            if (messageList.length > 0) {
                const lastMessage = messageList[messageList.length - 1];
                if (lastMessage.sender_id === selectedUser.id) {
                    markMessagesAsSeen();
                }
            }
        }
    };

    const markMessagesAsSeen = async () => {
        try {
            await axios.get(`/messages/${selectedUser.id}/mark-as-seen`);
            console.log("Marked messages as seen");
        } catch (error) {
            console.error(error);
        }
    };

    const renderMessagesWithDividers = () => {
        let currentDate = null;

        return messageList.map((message, index) => {
            const { content, created_at, sender_id } = message;
            const isCurrentUser = sender_id === user.id;

            let messageDate = null;
            if (created_at) {
                const date = new Date(created_at);
                if (!isNaN(date)) {
                    messageDate = date.toLocaleDateString();
                }
            }

            let divider = null;
            if (messageDate && messageDate !== currentDate) {
                divider = (
                    <Divider>
                        <DividerLine />
                        <DividerText>{messageDate}</DividerText>
                        <DividerLine />
                    </Divider>
                );
                currentDate = messageDate;
            }

            return (
                <React.Fragment key={content + index}>
                    {divider}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: isCurrentUser
                                ? "flex-end"
                                : "flex-start",
                            marginBottom: "4px",
                        }}
                    >
                        <p
                            style={{
                                padding: "8px 12px",
                                borderRadius: "16px",
                                backgroundColor: isCurrentUser
                                    ? "#f1f1f1"
                                    : "#e4e4e4",
                                maxWidth: "80%",
                                wordWrap: "break-word",
                                fontSize: "16px",
                            }}
                        >
                            {content}
                        </p>
                    </div>
                </React.Fragment>
            );
        });
    };

    return (
        <ChatBoxContainer>
            <Header>
                {user.name} Chats with {selectedUser.name}
            </Header>
            {messageList.length > 0 ? (
                <ChatBoxScroll ref={messageListRef}>
                    {renderMessagesWithDividers()}
                </ChatBoxScroll>
            ) : (
                <p
                    style={{
                        color: "#888",
                        textAlign: "center",
                        fontStyle: "italic",
                    }}
                >
                    No messages yet
                </p>
            )}
        </ChatBoxContainer>
    );
}

export default ChatBox;
