# DEVTINDER

 - Created a vite + react application
 - Removed unnecessary code and created a hello world app
 - Install Tailwind CSS
 - Install Daisy UI
 - Add Navbar component to App.js
 - Create a NavBar.jsx separate component file
 - Install react-router-dom
 - Create BrowserRouter > Routes > Route=/ Body > RouteChildren
 - Create an Outlet in your Body component
 - Create a footer
 - Create a Login Page
 - Install axios
 - CORS - Install cors in backend => add middleware in backend with configurations: origin, credentials:true
 - Whenever you are making api calls so pass axios => { withCredentials : true } ....this will allow the cookie to store token when logging in
 - Install react-redux + redux toolkit from official docs
 - configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add contants file + create a components folder
- You should not be able to access other routes without login
- If token is not present, redirect user to login page


 Body
    NavBar
    Route=/ => Feed
    Route=/login => Login    
    Route=/connections => Connections    