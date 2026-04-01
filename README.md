#Decision Maker Backend 
A polling/voting backend API where users can create polls, vote on options, and see real-time statistics! Built with Node.js, Express, and MongoDB.

Create new polls with multiple options (2-4 options)
Vote on existing polls
View all active/expired polls
See poll statistics
Can't vote twice (we track using IP address)

Folder Structure

src/
├── config/
│   └── database.js          # MongoDB connection setup
├── models/
│   ├── poll.model.js        # Poll schema (question, options, expiry)
│   ├── option.model.js      # Options for each poll
│   └── vote.model.js        # Vote records (with unique constraint)
└── routes/
    └── Polls.route.js       # All API endpoints

index.js                      # Server entry point
package.json                  # Dependencies

Prerequisites:

Node.js (v14 or higher)
MongoDB (Atlas or local)
Postman or similar tool for testing APIs


Run the server:
# Development mode (auto-reload) bcz i am using nodemon.
npm run dev

# Production mode
npm start
