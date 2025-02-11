const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.redirect('/browse?url=https://panzer.quest');
});

app.get('/browse', async (req, res) => {
    let targetUrl = req.query.url;
    if (!targetUrl) return res.send("No URL provided");

    let response = await fetch(targetUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    let body = await response.text();

    res.send(body.replace(/href="\//g, `href="/browse?url=${targetUrl}/`));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
