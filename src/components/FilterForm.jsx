/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import {
  SearchIcon,
  FilterIcon,
  TrashIcon,
  MinusCircleIcon,
} from '@heroicons/react/solid';
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
      setFilterByNumericValues([
        {
          ...filterByNumericValues[0],
          [property]: val,
        },
      ]);
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
    const newAvailableFilters = availableFilters.filter(
      (availableFilter) => availableFilter !== usedFilter,
    );
    setAvailableFilters(newAvailableFilters);
    updateNumericFilter(newAvailableFilters);
  };

  const filterTable = () => {
    const {
      column: property,
      comparison: operator,
      value,
    } = filterByNumericValues[0];
    const newData = filteredData.filter((planet) => {
      if (operator === 'maior que') {
        return planet[property] > Number(value);
      }
      if (operator === 'menor que') {
        return planet[property] < Number(value);
      }
      return planet[property] === value;
    });
    setFilteredData(newData);
    utilizeFilter(property);
    setAppliedFilters([
      ...appliedFilters,
      {
        property,
        operator,
        value,
      },
    ]);
  };

  const resetFilterList = () => {
    const originalFilters = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    setAvailableFilters(originalFilters);
  };

  const updateFilterList = (currAppliedFilters) => {
    const originalFilters = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    const newAvailableFilters = originalFilters.filter(
      (filter) => !currAppliedFilters.includes(filter),
    );
    setAvailableFilters(newAvailableFilters);
  };

  const updateFilters = (currAppliedFilters) => {
    let newData = [...data];
    currAppliedFilters.forEach(({ property, operator, value }) => {
      if (operator === 'menor que') {
        newData = newData.filter((planet) => planet[property] < Number(value));
      }
      if (operator === 'maior que') {
        newData = newData.filter((planet) => planet[property] > Number(value));
      } else {
        newData = newData.filter((planet) => planet[property] === value);
      }
    });
    setFilteredData(newData);
    updateFilterList(currAppliedFilters);
  };

  const removeAppliedFilter = (filterToRemove) => {
    const newAppliedFilters = appliedFilters.filter(
      ({ property }) => property !== filterToRemove,
    );
    setAppliedFilters(newAppliedFilters);
    updateFilters(newAppliedFilters);
  };

  const resetTable = () => {
    setFilteredData(data);
    setAppliedFilters([]);
    resetFilterList();
    setFilterByNumericValues([
      {
        ...filterByNumericValues[0],
        column: 'population',
      },
    ]);
  };

  return (
    <>
      <form
        onSubmit={ (event) => event.preventDefault() }
        className="mb-4 grid grid-cols-7 grid-rows-2 gap-4 px-12"
      >
        <div className="relative col-span-2 row-span-2 self-end">
          <div className="absolute inset-y-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-stone-800" />
          </div>
          <input
            type="text"
            name="search-input"
            id="search-input"
            className="w-full rounded-lg bg-slate-300 py-2 pl-10
            placeholder:font-semibold placeholder:text-slate-600"
            data-testid="name-filter"
            placeholder="Search"
            onChange={ (event) => inputHandler(event, 'Name') }
          />
        </div>

        <div className="row-span-2 self-end">
          <label
            htmlFor="column-filter"
            className="mb-1 block font-bold text-slate-300"
          >
            Filter by column
          </label>
          <select
            name="column-filter"
            id="column-filter"
            className="w-full rounded-lg bg-slate-300 p-2.5 font-semibold
            text-slate-600 focus:ring-2 focus:ring-blue-500"
            value={ filterByNumericValues[0].column }
            onChange={ (event) => inputHandler(event, 'NumericValues', 'column') }
            data-testid="column-filter"
          >
            {availableFilters.map((availableFilter) => (
              <option key={ availableFilter } value={ availableFilter }>
                {availableFilter}
              </option>
            ))}
          </select>
        </div>

        <div className="row-span-2 self-end">
          <label
            htmlFor="condition-input"
            className="mb-1 block font-bold text-slate-300"
          >
            When condition
          </label>
          <select
            name="condition-input"
            id="condition-input"
            className="w-full rounded-lg bg-slate-300 p-2.5 font-semibold
            text-slate-600 focus:ring-2 focus:ring-blue-500"
            value={ filterByNumericValues[0].comparison }
            onChange={ (event) => inputHandler(event, 'NumericValues', 'comparison') }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>

        <div className="row-span-2 self-end">
          <label
            htmlFor="value-input"
            className="mb-1 block font-bold text-slate-300"
          >
            Equals value
          </label>
          <input
            type="number"
            name="value-input"
            id="value-input"
            className="w-full rounded-lg bg-slate-300 p-2.5 font-semibold
            leading-none text-slate-600 focus:ring-2 focus:ring-blue-500"
            value={ filterByNumericValues[0].value }
            onChange={ (event) => inputHandler(event, 'NumericValues', 'value') }
            min="0"
            data-testid="value-filter"
          />
        </div>

        <button
          type="button"
          name="filter-button"
          id="filter-button"
          className="row-span-2 inline-flex items-center justify-center self-end
           rounded-lg px-5 py-2.5
           font-semibold leading-snug text-yellow-400 ring-2
           ring-inset ring-yellow-400 hover:bg-yellow-400 hover:text-slate-800"
          onClick={ () => filterTable() }
          disabled={ !availableFilters.length }
          data-testid="button-filter"
        >
          <FilterIcon className="-ml-2 mr-2 h-5 w-5" />
          FILTER
        </button>
        <button
          type="button"
          name="filter-button"
          id="filter-button"
          className="row-span-2 inline-flex items-center justify-center self-end
          rounded-lg px-5 py-2.5 font-semibold leading-snug text-red-700 ring-2 ring-inset
          ring-red-700 hover:bg-red-700 hover:text-slate-300"
          onClick={ () => resetTable() }
          data-testid="button-remove-filters"
        >
          <TrashIcon className="-ml-2 mr-2 h-5 w-5" />
          REMOVE FILTERS
        </button>
      </form>
      <div className="flex items-center gap-4 px-12">
        <SortForm />
        {appliedFilters.map(({ property, operator, value }, index) => (
          <p
            key={ `appliedFilter-${index}` }
            data-testid="filter"
            className="mr-4 mt-9 inline-flex border-b border-slate-400 pb-2 align-middle
            font-semibold hover:border-slate-300 hover:text-slate-300"
          >
            {`${property} ${operator} ${value}`}
            <button
              type="button"
              name="remove-filter-button"
              id="remove-filter-button"
              onClick={ () => removeAppliedFilter(property) }
            >
              <MinusCircleIcon className="ml-2 mt-1 h-4 w-4 text-red-800 hover:text-red-600" />
            </button>
          </p>
        ))}
      </div>
    </>
  );
}
