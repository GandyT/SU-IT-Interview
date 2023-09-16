const express = require("express")
const app = express()
const port = 8000

const fs = require("fs")

const cors = require('cors')

app.use(express.json())
app.use(cors())

/* GET POSTS FROM SERVER */
app.get("/api/getposts", async (req, res) => {
	const posts = JSON.parse(fs.readFileSync("posts.json"));
	res.json({ posts })
});

/* CREATE POST ON SERVER */
app.post("/api/createpost", async (req, res) => {
	const body = req.body;
	const author = body.author;
	const title = body.title;
	const content = body.content;

	/* ERROR CHECKS */
	if (!author) return res.send({ success: false, error: "Missing Author." })
	if (!title) return res.send({ success: false, error: "Missing Title." })
	if (!content) return res.send({ success: false, error: "Missing Content." })

	let posts = JSON.parse(fs.readFileSync("posts.json"));
	posts.push({ author, title, content })
	fs.writeFileSync("posts.json", JSON.stringify(posts))

	return res.send({ success: true })
})

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
})
