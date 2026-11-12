# ULTRON Console

A personal assistant console with a red command interface, optional browser voice input and speech output, nearby restaurant lookup, and OpenAI web search with clickable citations.

## Run locally

1. Install Node.js 22 or later.
2. From this folder, run `npm start`. No packages need to be installed.
3. Open <http://127.0.0.1:3000> in your browser.

Try **Italian nearby** for built-in Daytona Beach suggestions. Other nearby searches query OpenStreetMap via Overpass and fall back to Google Maps if listings are unavailable. The location button shares approximate coordinates with the listings service when you run a search. Microphone support depends on your browser and permissions; typing works without it.

## Enable OpenAI web search

Copy `.env.example` to `.env`, enter your own OpenAI API key there, then restart the app. Ask a question or click **Search the web**. The browser sends the question to the local server; the server calls the OpenAI Responses API. The key is never sent to the browser. Live OpenAI calls have not yet been verified with a real API key; the response and citation handling have been tested with simulated responses.

The included server is for your own computer only. Keep it bound to loopback. If you adapt this for public hosting, add real authentication and usage limits before enabling a paid API.

Calendar, Notion, and outbound calls are not included.

## License

[MIT](LICENSE). OpenStreetMap listings are credited to [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).
