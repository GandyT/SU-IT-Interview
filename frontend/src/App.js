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
		// Fetch data from api AND cause state to update (rerender)
		const fetchData = async () => {
			const request = await fetch("http://localhost:8080/api/getposts");
			const rjson = await request.json();
			setPosts(rjson.posts);
		}

		fetchData();
	}, [])

	const renderPosts = () => {
		return posts.map((post, i) => {
			return (
				<Post key={i} title={post.title} author={`By ${post.author}`} content={post.content} />
			)
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault(); // don't reload page with XHR data (legacy)

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

		// Send post to server
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(payload)
		  };

		const request = await fetch('http://localhost:8080/api/createpost', options);
		const rjson = await request.json();

		// Guard-clause for server/sending error
		if (!rjson.success){
			console.error("API did not successfully create a post");
			return;
		}

		// If successful,
		// add posts to array
		setPosts([...posts, payload]);

		// reset inputs
		setTitle("")
		setAuthor("")
		setContent("")

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
