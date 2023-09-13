const express = require("express")
const app = express()

const fs = require("fs")

app.get("/api/getposts", async (req, res) => {
	const posts = JSON.parse(fs.readFileSync("posts.json"));
	res.json({ posts })
});

app.post("/api/createpost", async (req, res) => {
	const body = req.body;
	const author = body.author;
	const title = body.title;
	const content = body.content;

	/* ERROR CHECKS */
	if (!author) return res.send({ success: false, error: "Missing Author." })
	if (!title) return res.send({ success: false, error: "Missing Title." })
	if (!content) return res.send({ success: false, error: "Missing Content." })

	let posts = JSON.parse(Fs.readFileSync("posts.json"));
	posts.push({ author, title, content })
	Fs.writeFileSync(JSON.stringify(posts))

	return res.send({ success: true })
})