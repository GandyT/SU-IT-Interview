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
		/* EDIT HERE: get posts from server (and update frontend) */
		/* TEMPLATE CODE: FEEL FREE TO CHANGE COMPLETELY */

		const fetchData = async () => {
			const data = (await fetch("api/getposts")).json()
			return data;
		}

		fetchData()
			.then(data => {
				setPosts(data.posts)
			})
		
	}, [])

	const renderPosts = () => {
		return posts.map((post, i) => {
			return (
				<Post key={i} title={post.title} author={`By ${post.author}`} content={post.content} />
			)
		})
	}

	const onSubmit = async () => {
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

		/* EDIT HERE: (send post to server) */
		fetch("api/createpost", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		})
	}

	return (
		<div>
			<center>
				<h1>POST WEBSITE</h1>
			</center>
			<div className="input-container">
				<div className="input-wrapper">
					<input className="input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
				</div>
				<div className="input-wrapper">
					<input className="input" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
				</div>
				<div className="input-wrapper">
					<input className="input" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
				</div>
				<div className="input-wrapper">
					<button className="submitButton" onClick={onSubmit}>Submit</button>
				</div>
			</div>
			<div className="post-container">
				{renderPosts()}
			</div>
		</div>
	)
}

export default App;
