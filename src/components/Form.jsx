import React, { useState } from 'react';

import { func } from 'prop-types';

import { verifyAll } from '../utils/verifyInputs';

import eventList from '../utils/eventList';

export default function Form({ onClickRegisterButton }) {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [dateInput, setDateInput] = useState();
  const [CPFInput, setCPFInput] = useState('');
  const [latitudeInput, setLatitudeInput] = useState();
  const [longitudeInput, setLongitudeInput] = useState();
  const [eventInput, setEventInput] = useState(eventList[0]);

  const makeStatusObject = () => ({
    name: nameInput,
    email: emailInput,
    cpf: CPFInput,
    date: dateInput,
    latitude_location: latitudeInput,
    longitude_location: longitudeInput,
    event: eventInput,
  });

  const isButtonDisabled = () => {
    const currentStatus = makeStatusObject();
    return !verifyAll(currentStatus);
  };

  return (
    <form>
      <label htmlFor="name-input">
        Nome:
        <input
          id="name-input"
          type="text"
          value={nameInput}
          onChange={({ target: { value } }) => setNameInput(value)}
        />
      </label>

      <label htmlFor="email-input">
        E-mail:
        <input
          id="email-input"
          type="text"
          value={emailInput}
          onChange={({ target: { value } }) => setEmailInput(value)}
        />
      </label>

      <label htmlFor="CPF-input">
        CPF:
        <input
          id="CPF-input"
          type="text"
          value={CPFInput}
          onChange={({ target: { value } }) => setCPFInput(value)}
        />
      </label>

      <label htmlFor="date-input">
        Data:
        <input
          id="date-input"
          type="date"
          value={dateInput}
          onChange={({ target: { value } }) => setDateInput(value)}
        />
      </label>

      <label htmlFor="latitude-input">
        Latitude:
        <input
          id="latitude-input"
          type="number"
          value={latitudeInput}
          onChange={({ target: { value } }) => setLatitudeInput(Number(value))}
        />
      </label>

      <label htmlFor="longitude-input">
        Longitude:
        <input
          id="longitude-input"
          type="number"
          value={longitudeInput}
          onChange={({ target: { value } }) => setLongitudeInput(Number(value))}
        />
      </label>

      <label htmlFor="event-input">
        Evento:
        <select
          id="event-input"
          value={eventInput}
          onChange={({ target: { value } }) => setEventInput(value)}
        >
          { eventList.map((event) => <option value={event} key={`event-option-${event}`}>{ event }</option>) }
        </select>
      </label>

      <button
        disabled={isButtonDisabled()}
        type="button"
        onClick={() => onClickRegisterButton(makeStatusObject())}
      >
        Cadastrar
      </button>

    </form>
  );
}

Form.propTypes = { onClickRegisterButton: func.isRequired };
