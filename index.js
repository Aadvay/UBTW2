export default {
    async fetch(request) {
        let url = new URL(request.url);
        url.hostname = "panzer.quest"; // Target site

        let modifiedHeaders = new Headers(request.headers);
        modifiedHeaders.set("Origin", "https://panzer.quest");
        modifiedHeaders.set("Referer", "https://panzer.quest/");
        modifiedHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
        modifiedHeaders.set("Host", "panzer.quest");

        let response = await fetch(url, {
            method: request.method,
            headers: modifiedHeaders,
            body: request.method === "GET" ? null : request.body,
            redirect: "manual"
        });

        if (response.status >= 300 && response.status < 400) {
            let location = response.headers.get("Location");
            if (location && location.startsWith("https://panzer.quest")) {
                location = location.replace("https://panzer.quest", request.url.origin);
                return Response.redirect(location, response.status);
            }
        }

        return new Response(response.body, response);
    }
};
