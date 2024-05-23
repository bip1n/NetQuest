// App.js
import React from 'react';
import NavbarComponent from "./components/NavbarComponent"; // Import the NavbarComponent
import './App.css'; // If you have any custom CSS file
import Searchbar from './components/Searchbar';
import ContentCard from './components/ContentCard';

const App = () => {
  return (
    <>
    <NavbarComponent /> 
    <Searchbar />
    <ContentCard />
    </>
  );
};

export default App;
