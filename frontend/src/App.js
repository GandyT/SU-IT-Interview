import './App.css';
import { useState, useEffect } from "react"

function Post({ title, author, content }) {
	return (
		<div className="post">
			<div className="post-title">{title}</div>
			<div className="post-author">{author}</div>
			<div className="post-content">{content}</div>
		</div>
	)
}

function App() {
	let [posts, setPosts] = useState([])

	// inputs
	let [title, setTitle] = useState("")
	let [author, setAuthor] = useState("")
	let [content, setContent] = useState("")

	useEffect(() => {
		const serverPosts = [] // fetch posts

		setPosts(serverPosts);
	}, [])

	const renderPosts = () => {
		return posts.map((post, i) => {
			return (
				<Post key={i} title={post.title} author={post.author} content={post.content} />
			)
		})
	}

	const onSubmit = () => {
		if (!title) {
			alert("Missing Title.");
			return;
		}

		if (!author) {
			alert("Missing Author.");
			return;
		}

		if (!content) {
			alert("Missing Content.");
			return;
		}

		let payload = {
			title, author, content
		}

		// add posts to array
		setPosts([...posts, payload]);

		// reset inputs
		setTitle("")
		setAuthor("")
		setContent("")

		// post to server
	}

	return (
		<div>
			<div>
				<input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
				<input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
				<input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
				<button onClick={onSubmit}>Submit</button>
			</div>
			<div>
				{renderPosts()}
			</div>
		</div>
	)
}

export default App;
