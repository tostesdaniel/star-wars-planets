import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';
import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function SortForm() {
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const { filteredData, setFilteredData } = useContext(PlanetsContext);

  const orderTable = (arr, { column, sort }) => {
    const after = 1;
    const before = -1;
    const orderedPlanets = [...arr].sort((a, b) => {
      if (b[column] === 'unknown') return sort === 'DESC' ? before : after;
      if (Number(a[column]) === Number(b[column])) {
        return sort === 'ASC'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return sort === 'ASC'
        ? Number(a[column]) - Number(b[column])
        : Number(b[column]) - Number(a[column]);
    });
    setFilteredData(orderedPlanets);
  };

  return (
    <form
      onSubmit={ (event) => event.preventDefault() }
      className="flex items-center gap-4"
    >
      <label
        htmlFor="column-sort"
        className="mb-1 flex flex-col font-bold text-slate-300"
      >
        Sort by column
        <select
          name="column-sort"
          id="column-sort"
          className="w-fit rounded-lg bg-slate-300 p-2.5 font-semibold text-slate-600
        focus:ring-2 focus:ring-blue-500"
          value={ order.column }
          onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
          data-testid="column-sort"
        >
          {columns.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
        </select>
      </label>
      <label
        htmlFor="column-sort-input-asc"
        className="font-semibold text-slate-300"
      >
        <input
          type="radio"
          name="column-sort-input"
          className="column-sort-input mr-2 mt-6 h-4 w-4"
          value={ order.sort }
          onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
          checked={ order.sort === 'ASC' }
          data-testid="column-sort-input-asc"
        />
        ASC
      </label>
      <label
        htmlFor="column-sort-input-desc"
        className="font-semibold text-slate-300"
      >
        <input
          type="radio"
          name="column-sort-input"
          className="column-sort-input mr-2 mt-6 h-4 w-4"
          value={ order.sort }
          onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
          checked={ order.sort === 'DESC' }
          data-testid="column-sort-input-desc"
        />
        DESC
      </label>
      <button
        type="submit"
        className="row-span-2 inline-flex items-center justify-center self-end
          rounded-lg
        px-5 py-2.5 font-semibold leading-snug text-blue-500 ring-2
        ring-inset ring-blue-500 hover:bg-blue-500 hover:text-slate-300"
        onClick={ () => orderTable(filteredData, order) }
        data-testid="column-sort-button"
      >
        {order.sort === 'ASC' ? (
          <SortAscendingIcon className="-ml-2 mr-2 h-5 w-5" />
        ) : (
          <SortDescendingIcon className="-ml-2 mr-2 h-5 w-5" />
        )}
        ORDENAR
      </button>
    </form>
  );
}
