// UserList.jsx
import React, { useState } from "react";
import styled from "styled-components";

const UserListContainer = styled.div`
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 16px;
    color: #333;
`;

const UserListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const UserListItem = styled.li`
    margin-bottom: 8px;
`;

const UserName = styled.a`
    display: block;
    cursor: pointer;
    color: #333;
    text-decoration: none;

    &:hover {
        color: #777;
    }
`;

const Badge = styled.span`
    background-color: red;
    color: white;
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 8px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 8px;
`;

function UserList({ currentUser, users, handleUserClick, unreadMessages }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <UserListContainer>
            <Title>Users</Title>
            <SearchInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <UserListWrapper>
                {filteredUsers.map((user) => {
                    const unreadMessageCount = unreadMessages.filter(
                        (message) => message.sender_id === user.id
                    ).length;

                    return (
                        <UserListItem key={user.id}>
                            <UserName onClick={() => handleUserClick(user)}>
                                {user.name}
                                {unreadMessageCount > 0 && (
                                    <Badge>{unreadMessageCount}</Badge>
                                )}
                            </UserName>
                        </UserListItem>
                    );
                })}
            </UserListWrapper>
        </UserListContainer>
    );
}

export default UserList;
