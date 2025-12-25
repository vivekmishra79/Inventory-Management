-------- Features -----------
  ------------------ Authentication-------------------------

User Registration

User Login with JWT Authentication

Token stored in localStorage

Proper error handling for invalid credentials

 --------------------Product Management--------------------

View list of chemical products

Product search handled on frontend (CAS Number / Name)

Protected routes (only logged-in users can access products)

---------------------- UI / UX------------------------------

  Responsive UI using Tailwind CSS

Clean and modern login & register pages

Loading states and error messages

----------------------- Tech Stack---------------------------
Frontend

React.js

React Router DOM

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Token)

bcrypt (for password hashing)

---------------------------------Project Structure---------------------
inventory-management/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── Api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

--------------------------- Environment Variables

Create a .env file in backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

--------------------Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/inventory-management.git
cd inventory-management

2️⃣ Backend Setup
cd backend
npm install
npm start


Backend will run on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5173

--------------Login Input Validation (Important)

Username and Password are trimmed before API call

Leading or trailing spaces will not cause login issues

Backend also sanitizes input for extra security

---------------Authentication Flow

User logs in

Backend returns JWT token

Token stored in localStorage

Protected routes check token before access



----------------Future Improvements

Role-based access (Admin/User)

Pagination & sorting

Product CRUD (Add/Edit/Delete)

Refresh tokens

SEO optimization