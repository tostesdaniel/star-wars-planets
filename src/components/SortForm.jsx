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
    const [after, before] = [1, -1];
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
    <form onSubmit={ (event) => event.preventDefault() }>
      <select
        name="column-sort"
        id="column-sort"
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
      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          name="column-sort-input"
          className="column-sort-input"
          value={ order.sort }
          onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
          checked={ order.sort === 'ASC' }
          data-testid="column-sort-input-asc"
        />
        ASC
      </label>
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          name="column-sort-input"
          className="column-sort-input"
          value={ order.sort }
          onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
          checked={ order.sort === 'DESC' }
          data-testid="column-sort-input-desc"
        />
        DESC
      </label>
      <button
        type="submit"
        onClick={ () => orderTable(filteredData, order) }
        data-testid="column-sort-button"
      >
        ORDENAR
      </button>
    </form>
  );
}
