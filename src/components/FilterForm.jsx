import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterForm() {
  const {
    filteredData,
    setFilteredData,
    setFilterByName,
    filterByNumericValues,
    filterByNumericValues: {
      column,
      comparison,
    },
    setFilterByNumericValues,
  } = useContext(PlanetsContext);

  const inputHandler = ({ target: { value: val } }, type, property) => {
    if (type === 'Name') {
      setFilterByName(val);
    } else if (type === 'NumericValues') {
      setFilterByNumericValues([{
        ...filterByNumericValues[0],
        [property]: val,
      }]);
    }
  };

  const filter = () => {
    const { column: property, comparison: operator, value } = filterByNumericValues[0];
    const newData = filteredData.filter((planet) => {
      if (operator === 'maior que') {
        return planet[property] > Number(value);
      } if (operator === 'menor que') {
        return planet[property] < Number(value);
      }
      return planet[property] === value;
    });
    setFilteredData(newData);
  };

  return (
    <form onSubmit={ (event) => event.preventDefault() }>
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="name-filter"
        placeholder="Search"
        onChange={ (event) => inputHandler(event, 'Name') }
      />
      <label htmlFor="column-select">
        Column
        <select
          name="column-filter"
          id="column-filter"
          value={ column }
          onChange={ (event) => inputHandler(event, 'NumericValues', 'column') }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="condition-input">
        Condition
        <select
          name="condition-input"
          id="condition-input"
          value={ comparison }
          onChange={ (event) => inputHandler(event, 'NumericValues', 'comparison') }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-input">
        Value
        <input
          type="number"
          name="value-input"
          id="value-input"
          value={ filterByNumericValues[0].value }
          onChange={ (event) => inputHandler(event, 'NumericValues', 'value') }
          min="0"
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        name="filter-button"
        id="filter-button"
        onClick={ () => filter() }
        data-testid="button-filter"
      >
        FILTER
      </button>
    </form>
  );
}
