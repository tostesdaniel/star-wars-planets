import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import SortForm from './SortForm';

export default function FilterForm() {
  const [appliedFilters, setAppliedFilters] = useState([]);

  const {
    data,
    filteredData,
    setFilteredData,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    availableFilters,
    setAvailableFilters,
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

  const updateNumericFilter = (unusedFilters) => {
    const newFilters = {
      ...filterByNumericValues[0],
      column: unusedFilters[0],
    };
    setFilterByNumericValues([newFilters]);
  };

  const utilizeFilter = (usedFilter) => {
    const newAvailableFilters = availableFilters
      .filter((availableFilter) => availableFilter !== usedFilter);
    setAvailableFilters(newAvailableFilters);
    updateNumericFilter(newAvailableFilters);
  };

  const filterTable = () => {
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
    utilizeFilter(property);
    setAppliedFilters([
      ...appliedFilters, {
        property,
        operator,
        value,
      }]);
  };

  const resetFilterList = () => {
    const originalFilters = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    setAvailableFilters(originalFilters);
  };

  const updateFilterList = (currAppliedFilters) => {
    const originalFilters = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    const newAvailableFilters = originalFilters
      .filter((filter) => !currAppliedFilters.includes(filter));
    setAvailableFilters(newAvailableFilters);
  };

  const updateFilters = (currAppliedFilters) => {
    let newData = [...data];
    currAppliedFilters.forEach(({ property, operator, value }) => {
      if (operator === 'menor que') {
        newData = newData.filter((planet) => planet[property] < Number(value));
      } if (operator === 'maior que') {
        newData = newData.filter((planet) => planet[property] > Number(value));
      } else {
        newData = newData.filter((planet) => planet[property] === value);
      }
    });
    setFilteredData(newData);
    updateFilterList(currAppliedFilters);
  };

  const removeAppliedFilter = (filterToRemove) => {
    const newAppliedFilters = appliedFilters
      .filter(({ property }) => property !== filterToRemove);
    setAppliedFilters(newAppliedFilters);
    updateFilters(newAppliedFilters);
  };

  const resetTable = () => {
    setFilteredData(data);
    setAppliedFilters([]);
    resetFilterList();
  };

  return (
    <>
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
            value={ filterByNumericValues[0].column }
            onChange={ (event) => inputHandler(event, 'NumericValues', 'column') }
            data-testid="column-filter"
          >
            {
              availableFilters.map((availableFilter) => (
                <option
                  key={ availableFilter }
                  value={ availableFilter }
                >
                  {availableFilter}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="condition-input">
          Condition
          <select
            name="condition-input"
            id="condition-input"
            value={ filterByNumericValues[0].comparison }
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
          onClick={ () => filterTable() }
          data-testid="button-filter"
        >
          FILTER
        </button>
        <button
          type="button"
          name="filter-button"
          id="filter-button"
          onClick={ () => resetTable() }
          data-testid="button-remove-filters"
        >
          REMOVE FILTERS
        </button>
      </form>
      <div>
        {
          appliedFilters.map(({ property, operator, value }, index) => (
            <p
              key={ `appliedFilter-${index}` }
              data-testid="filter"
            >
              {`${property} ${operator} ${value}`}
              <button
                type="button"
                name="remove-filter-button"
                id="remove-filter-button"
                onClick={ () => removeAppliedFilter(property) }
              >
                X
              </button>
            </p>
          ))
        }
      </div>
      <SortForm />
    </>
  );
}
