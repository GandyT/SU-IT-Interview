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
		/* update the "posts" array declared on line 15 with an array of posts from the server */
		/* api route: "http://localhost:8000/api/getposts" */

		/* 
		const fetchData = async () => {
		
		}

		fetchData()
  		*/
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

		/* EDIT HERE: (send post to server) */
		/* create a post request that sends the server the "payload" variable to store a post on the server */
		/* api route: "http://localhost:8000/api/createpost" */
		

		/* DON'T CHANGE ANYTHING BELOW HERE */

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
