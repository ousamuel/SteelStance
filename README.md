## Introduction
Welcome to SteelStance, a full-stack fitness application developed using the framework Next.js with a Flask backend. Users can calculate their BMI on the home page, view other users' personal records for powerlifts (squat, bench, deadlift) and view different workout programs. The workout program section is meant to simulate a website working in tandem with an actual fitness service.

Video Demo: https://www.loom.com/share/ba8e4fa6b50b455da4cbbdf6c12f4bb3?sid=1d94f361-e22c-4d53-b686-c263d8deb8f8

# SteelStance
Deployed via Vercel & PythonAnywhere: [Click here to visit the site](https://fitness-app-ousamuel.vercel.app/)
(Please allow time for the application to spin up or refresh)

[![Home Page Screen Shot](images/home-ss.png)](https://raw.githubusercontent.com/ousamuel/fitness-app/main/images/home-ss.png)


After signing up/logging in through authentication, users can submit their own personal records and save workout programs, both viewable in their profile page. Users can edit their account information (username, email, height, weight) and delete their profile. If their profile is deleted, their personal records are also deleted.

(The database is pre-seeded with sample data for programs and 5 users with personal records).

## Features
- Custom-built User Authentication
- User Login/Sign Up
- Edit & Delete Profile
- Viewing Other Personal Records (sortable through various categories)
- Post Personal Records
- Save/Unsave Workout Programs

Front-end Integrations:
- Formik for form management
- useContext for state management
- NextUI library for UI components

Back-end Integrations:
- User authentication via Flask-Login and Flask-Bcrypt for secure session management and password hashing
- Object-relational mapping utilizing SQLAlchemy
- RESTful API with full CRUD + CORS for cross-origin requests


## Acknowledgements
- [NextUI](https://nextui.org/)
- [SVG Vectors/Icons](https://www.svgrepo.com/)

## To run this repository on your local machine: 

Clone the repository
```bash
git clone git@github.com:ousamuel/fitness-app.git
```

Install all required dependencies
```bash
chmod +x setup.sh
bash setup.sh
```

Open two different terminals

Terminal 1: cd into the 1-next directory
- Open providers.js
- Change line 17 to:
```bash
const BACKEND_URL = "http://localhost:3000";
```
Run this command
```bash
npm run dev
```
Terminal 2: cd into the 2-flask directory
- Open app.py
- Comment out lines 16, 31, 32
- Uncomment lines 17, 29, 30

Add this block to end of app.py
```bash
if __name__ == "__main__":
    app.run(port=5555, debug = True )
```
Run this command
```bash
python app.py
```
To re-seed the database with sample data:
```bash
python seed.py
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Sample User Logins(1-5):
- email: user1@gmail.com
- password: user1pass

By default:
Next.js server is ran on port 3000 & Flask application on port 5500 


