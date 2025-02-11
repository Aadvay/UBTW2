const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(`
        <h2>Enter a URL</h2>
        <form action="/browse">
            <input type="text" name="url" placeholder="https://example.com">
            <button type="submit">Go</button>
        </form>
    `);
});

app.get('/browse', async (req, res) => {
    let targetUrl = req.query.url;
    if (!targetUrl) return res.send("No URL provided");

    let response = await fetch(targetUrl);
    let body = await response.text();

    res.send(body.replace(/href="\//g, `href="/browse?url=${targetUrl}/`)); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
