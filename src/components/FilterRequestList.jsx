import React, { useState, useContext } from 'react';
import context from '../context/context';
import { defaultFilter, locationFilter, searchFilter } from '../utils/filterFunctions';

export default function FilterRequestList() {
  const [selectFilter, setSelectFilter] = useState('cpf');
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState({ latitude: '', longitude: '', radius: '' });
  const {
    useFilter, setUseFilter, setFilterParams,
  } = useContext(context);

  const selectChange = ({ target: { value } }) => {
    setSelectFilter(value);
    setSearchInput('');
    setLocationInput({ latitude: '', longitude: '', radius: '' });
    setFilterParams(defaultFilter);
  };

  const inputTextChange = ({ target: { value } }) => {
    setSearchInput(value);
    setFilterParams(searchFilter(selectFilter, value));
  };

  const inputLocationChange = ({ target: { value, name } }) => {
    setLocationInput((prev) => {
      const newLocation = { ...prev, [name]: value };
      setFilterParams(locationFilter(newLocation));
      return newLocation;
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="filter-input-checkbox">
          Filtrar lista
          {' '}
          <input
            id="filter-input-checkbox"
            type="checkbox"
            value={useFilter}
            onChange={({ target: { checked } }) => setUseFilter(checked)}
          />
        </label>
      </div>
      <label htmlFor="filter-select-option">
        Coluna
        <select
          id="filter-select-option"
          value={selectFilter}
          onChange={selectChange}
        >
          <option value="cpf">CPF</option>
          <option value="name">nome</option>
          <option value="email">email</option>
          <option value="crop">lavoura</option>
          <option value="date">data do evento</option>
          <option value="event">evento</option>
          <option value="create_at">data da requisição</option>
          <option value="location">localização</option>
        </select>
      </label>
      {selectFilter !== 'location'
        ? (
          <label htmlFor="filter-input-text">
            Buscar por
            <input
              id="filter-input-text"
              type={selectFilter === 'date' || selectFilter === 'create_at' ? 'date' : 'text'}
              onChange={inputTextChange}
              value={searchInput}
            />
          </label>
        )
        : (
          <>
            <label htmlFor="filter-input-latitude">
              Latitude
              <input
                id="filter-input-latitude"
                name="latitude"
                type="text"
                value={locationInput.latitude}
                onChange={inputLocationChange}
              />
            </label>

            <label htmlFor="filter-input-longitude">
              Longitude
              <input
                id="filter-input-longitude"
                name="longitude"
                type="text"
                value={locationInput.longitude}
                onChange={inputLocationChange}
              />
            </label>

            <label htmlFor="filter-input-radius">
              Raio de busca(KM)
              <input
                id="filter-input-radius"
                name="radius"
                type="number"
                value={locationInput.radius}
                onChange={inputLocationChange}
              />
            </label>
          </>
        )}

    </div>
  );
}
