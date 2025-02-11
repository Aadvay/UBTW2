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

    try {
        let response = await fetch(targetUrl, {
            headers: { 
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://panzer.quest',
                'Origin': 'https://panzer.quest'
            }
        });

        let body = await response.text();

        // Fix relative links
        body = body.replace(/href="\//g, `href="${targetUrl}/`);
        body = body.replace(/src="\//g, `src="${targetUrl}/`);

        res.send(body);
    } catch (error) {
        res.send(`Error fetching page: ${error.message}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
