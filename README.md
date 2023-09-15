# SU-IT-Interview
- You may google anything (even StackOverflow).
- You may download any external libraries.
- Please do not share interview material as it is only sabotaging yourself.

# Description
The Student Union IT Department has created a website where students can post whatever they want. 
Please connect the backend to the frontend. This will require you to examine the backend, but only write code
in the frontend.

- fetch existing posts when the website loads
- allow users to create their own post that will be saved in a JSON file on the "backend"

# Setup Instructions
- Clone the Repository
- Create a new branch with your first and last name. ex: "randy-sim" or "david-chen"
- type "npm install" within each directory.
- run the backend first with "node ."
- run the frontend with "npm start".
- Once finished, push the changes you made on your branch.

# Backend API

/api/getposts - returns an array of posts
```js
post = {
    title: "post title",
    author: "post author",
    content: "post content"
}
```

/api/createpost - creates a post and saves it on the server
expects client to send "post" information. 
```js
post = {
    title: "post title",
    author: "post author",
    content: "post content"
}
```

