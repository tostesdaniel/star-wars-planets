import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import tableData from './structure';

function formatDate(date) {
  return date.split('T')[0];
}

export default function Table() {
  const { filteredData, filterByName } = useContext(PlanetsContext);

  return (
    <table className="mx-auto mt-4 table-fixed bg-slate-900">
      <thead>
        <tr className="rounded border-2 border-sw_yellow/75 backdrop-blur-xl">
          {Object.entries(tableData)[0][1].map((data) => (
            <th key={ data } className="w-fit p-1 text-center text-slate-200">
              {data}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        className="divide-y divide-black/50 border-2
      border-sw_yellow/75 bg-slate-800"
      >
        {filteredData
          .filter(
            ({ name }) => name.includes(filterByName)
              || name.includes(
                filterByName
                  // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
                  .charAt(0)
                  .toUpperCase() + filterByName.slice(1),
              ),
          )
          .map(
            ({
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ name } className="divide-x divide-black/50">
                <td data-testid="planet-name" className="p-2 text-center">
                  {name}
                </td>
                <td className="p-2 text-center">{rotationPeriod}</td>
                <td className="p-2 text-center">{orbitalPeriod}</td>
                <td className="p-2 text-center">{diameter}</td>
                <td className="p-2 text-center">{climate}</td>
                <td className="p-2 text-center">{gravity}</td>
                <td className="p-2 text-center">{terrain}</td>
                <td className="p-2 text-center">{surfaceWater}</td>
                <td className="p-2 text-center">{population}</td>
                <td className="p-2 text-center">
                  {films.map((film) => (
                    <a href={ film } key={ film }>
                      <p className="underline hover:text-slate-500 hover:no-underline">
                        {`Movie ${film[28]}`}
                      </p>
                    </a>
                  ))}
                </td>
                <td className="p-2 text-center">{formatDate(created)}</td>
                <td className="p-2 text-center">{formatDate(edited)}</td>
                <td className="p-2 text-center">
                  <a
                    href={ url }
                    className="underline hover:text-slate-500 hover:no-underline"
                  >
                    {url}
                  </a>
                </td>
              </tr>
            ),
          )}
      </tbody>
    </table>
  );
}
