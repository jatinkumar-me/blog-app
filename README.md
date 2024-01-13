# Blog App
A web application for creating blog posts. It provides a user-friendly interface for creating, editing, and deleting blog posts using a rich-text editor, as well as a platform for users to read and interact with the published posts.

<video src="https://github.com/jatinkumar-me/blog-app/assets/85551434/743ae825-7cf4-4bee-ba10-9a5384d9b26d" width="100%" control />

## Features
- Blog will autosave after 5 seconds of inactivity, it uses debouncing to minimize the number of API calls when saving.
- Lazy loading of login form modal and text-editor to decrease initial load times.
- User Registration and Authentication: Users can create an account, log in, and log out to access the blog app's features.
- Create Blog Posts: Authenticated users can create new blog posts and edit their existing posts. The app provides a rich text editor to compose and format the blog content.
- Delete Blog Posts: Users can delete their own blog posts if they no longer wish to keep them.
- Responsive Design: The application is designed to be mobile-friendly and accessible across various devices and screen sizes.

## Tech Stack
The Blog App is built using the following technologies:
### Frontend:
- React.js (JavaScript library for building user interfaces)
- Redux Toolkit
- Mantine UI

### Backend:
- Node.js (JavaScript runtime environment)
- Express.js (web application framework for Node.js)
- MongoDB (NoSQL database)
- Mongoose (MongoDB object modeling for Node.js)

### Additional Tools and Libraries:

- JWT (JSON Web Tokens for user authentication)
- Bcrypt.js (library for hashing passwords)
