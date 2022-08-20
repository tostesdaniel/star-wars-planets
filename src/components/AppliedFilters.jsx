import { MinusCircleIcon } from '@heroicons/react/solid';
import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function AppliedFilters() {
  const {
    appliedFilters,
    setAppliedFilters,
    data,
    setAvailableFilters,
    setFilteredData,
  } = useContext(PlanetsContext);

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

  return (
    <>
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
            <MinusCircleIcon
              className="ml-2 mt-1 h-4 w-4
            text-red-800 hover:text-red-600"
            />
          </button>
        </p>
      ))}
    </>
  );
}
