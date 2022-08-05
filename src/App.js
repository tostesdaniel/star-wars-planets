import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table/Table';
import FilterForm from './components/FilterForm';
import './App.css';
import './index.css';
import Header from './components/Header/Header';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <FilterForm />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
