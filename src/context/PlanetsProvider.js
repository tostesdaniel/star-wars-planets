import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
// ---Mock---
// import response from '../testData';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  ]);

  const context = {
    data,
    setData,
    filteredData,
    setFilteredData,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  async function fetchPlanets() {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();
    const { results } = apiData;
    setData(results);

    // ---Mock---
    // setData(response.results);
  }

  useEffect(() => {
    if (!data.length) {
      fetchPlanets();
    }
    setFilteredData(data);
  }, [data]);

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetsProvider;
