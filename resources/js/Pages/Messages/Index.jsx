import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Realtime } from "ably";
import axios from "axios";

import UserList from "@/Components/Messages/UserList";
import ChatBox from "@/Components/Messages/ChatBox";
import MessageForm from "@/Components/Messages/MessageForm";

const ably = new Realtime({
    key: "eWB8QQ.MR3u5g:z22iwiGPPjFZKSeg8ayyJKS8XQJj8UYdamTQoFlLTGA",
});

function MessagesIndex({ users, user }) {
    const { data, setData, reset, errors, processing } = useForm({
        content: "",
    });
    const [messageList, setMessageList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState([]);

    useEffect(() => {
        const channel = ably.channels.get(`messages.${user.id}`);

        const messageSentHandler = (message) => {
            const { content, sender_id } = message.data;
            if (
                selectedUser &&
                (sender_id === selectedUser.id || sender_id === user.id)
            ) {
                setMessageList((messageList) => [
                    ...messageList,
                    { content, sender_id },
                ]);
            }

            if (selectedUser && sender_id !== selectedUser.id) {
                setUnreadMessages((unreadMessages) => [
                    ...unreadMessages,
                    { content, sender_id },
                ]);
            }
        };

        channel.subscribe(".MessageSent", messageSentHandler);

        return () => {
            channel.unsubscribe(".MessageSent", messageSentHandler);
        };
    }, [user, selectedUser]);

    useEffect(() => {
        fetchUnreadMessages();
    }, [user]);

    useEffect(() => {
        // Update unread messages when the messageList, user.id, or selectedUser changes
        const updateUnreadMessages = () => {
            const updatedUnreadMessages = messageList
                .filter(
                    (message) =>
                        message.sender_id !== user.id &&
                        message.sender_id !== selectedUser?.id
                )
                .map((message) => message.sender_id);
            setUnreadMessages(updatedUnreadMessages);
        };

        updateUnreadMessages();
    }, [messageList, user.id, selectedUser]);

    const fetchUnreadMessages = async () => {
        try {
            const response = await axios.get(
                `/user/${user.id}/lastUnreadMessages`
            );
            setUnreadMessages(response.data);
        } catch (error) {
            console.error(error);
            setUnreadMessages([]);
        }
    };

    const handleUserClick = async (user) => {
        reset();
        setSelectedUser(user);

        try {
            const response = await axios.get(`/messages/fetch/${user.id}`);
            setMessageList(
                Array.isArray(response.data.messages)
                    ? response.data.messages
                    : []
            );
        } catch (error) {
            setMessageList([]);
        }
    };

    const handleSubmit = async (e) => {
        const message = {
            content: data.content,
            sender_id: user.id,
        };

        try {
            await axios.post(`/messages/${selectedUser.id}`, message);

            const senderChannel = ably.channels.get(`messages.${user.id}`);
            const recipientChannel = ably.channels.get(
                `messages.${selectedUser.id}`
            );
            senderChannel.publish(".MessageSent", message, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Message sent to sender channel");
                }
            });

            recipientChannel.publish(".MessageSent", message, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Message sent to recipient channel");
                }
            });

            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <UserList
                            users={users}
                            currentUser={user}
                            handleUserClick={handleUserClick}
                            unreadMessages={unreadMessages}
                        />
                    </div>
                    <div>
                        {selectedUser && (
                            <ChatBox
                                user={user}
                                selectedUser={selectedUser}
                                messageList={messageList}
                            />
                        )}
                        {selectedUser && (
                            <MessageForm
                                handleSubmit={handleSubmit}
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                            />
                        )}
                    </div>
                </div>

                <br />
                <Link href={route("users.index")}>Back to Users</Link>
            </div>
        </AuthenticatedLayout>
    );
}

export default MessagesIndex;
