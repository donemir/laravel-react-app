import React from "react";
import { Link } from "@inertiajs/inertia-react";

function UsersIndex({ users }) {
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link
                            href={route("messages.index", {
                                user: user.id,
                            })}
                        >
                            {user.name}
                        </Link>
                        {console.log(user.lastMessage)}
                        {user.lastMessage && !user.lastMessage.seen_at && (
                            <span>Unread</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersIndex;
