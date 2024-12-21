const express = require("express");
const { createServer } = require("http");

const app = express();
const githubData = {
    "login": "Shoyeb45",
    "id": 145090017,
    "node_id": "U_kgDOCKXl4Q",
    "avatar_url": "https://avatars.githubusercontent.com/u/145090017?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Shoyeb45",
    "html_url": "https://github.com/Shoyeb45",
    "followers_url": "https://api.github.com/users/Shoyeb45/followers",
    "following_url": "https://api.github.com/users/Shoyeb45/following{/other_user}",
    "gists_url": "https://api.github.com/users/Shoyeb45/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Shoyeb45/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Shoyeb45/subscriptions",
    "organizations_url": "https://api.github.com/users/Shoyeb45/orgs",
    "repos_url": "https://api.github.com/users/Shoyeb45/repos",
    "events_url": "https://api.github.com/users/Shoyeb45/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Shoyeb45/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "name": "Shoyeb Ansari",
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": "Hello , my name is Shoyeb Ansari. I am currently pursuing Bsc(Hons) in Data Science & AI from IIT Guwahati  and also from PW Institute Of Innovation. \r\n",
    "twitter_username": null,
    "public_repos": 16,
    "public_gists": 0,
    "followers": 7,
    "following": 2,
    "created_at": "2023-09-15T03:56:21Z",
    "updated_at": "2024-12-16T04:46:48Z"
 };

// Define your routes
app.get('/', (req, res) => {
    res.send("I am Shoyeb Ansari!");
});

app.get('/twitter', (req, res) => {
    res.send("Shoyeb45");
});

app.get("/login", (req, res) => {
    res.send("<h1>Please login</h1>");
});

app.get("/youtube", (req, res) => {
    res.send("<h2>Chai aur me</h2>");
});

// Get github data
app.get("/github", (req, res) => {
    res.json({githubData});
});

// Export the app as a Vercel serverless function
module.exports = (req, res) => {
    const server = createServer(app);
    server.emit('request', req, res);
};
