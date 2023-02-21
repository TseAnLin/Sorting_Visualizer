//to view the web => 1. unset HOST 2. npm start
import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';

// Function Component (props is empty)
function App() {
  return (
    <div className="App">
      <SortingVisualizer />
    </div>
  );
}

export default App;
