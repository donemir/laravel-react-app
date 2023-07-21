/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import { Realtime } from "ably";

window.Ably = new Realtime({
    key: "eWB8QQ.MR3u5g:z22iwiGPPjFZKSeg8ayyJKS8XQJj8UYdamTQoFlLTGA",
    tls: true,
});

window.Echo = {
    channel: function () {
        return {
            listen: function (channelName, eventName, callback) {
                const channel = window.Ably.channels.get(channelName);
                channel.subscribe(eventName, (message) => {
                    callback(message.data);
                });
            },
            stopListening: function (channelName, eventName) {
                const channel = window.Ably.channels.get(channelName);
                channel.unsubscribe(eventName);
            },
        };
    },
};
