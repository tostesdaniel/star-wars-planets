import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterForm() {
  const { setFilterByName } = useContext(PlanetsContext);

  const inputHandler = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <form>
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="name-filter"
        placeholder="Search"
        onChange={ (event) => inputHandler(event) }
      />
    </form>
  );
}
