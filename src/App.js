import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import FilterForm from './components/FilterForm';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <FilterForm />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
