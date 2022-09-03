import React, { useState, useContext } from 'react';
import context from '../context/context';
import { verifyAll } from '../utils/verifyInputs';
import register from '../api/registerExemptionRequests';
import eventList from '../utils/eventList';

export default function Form() {
  const { updateRequestArray } = useContext(context);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [CPFInput, setCPFInput] = useState('');
  const [cropInput, setCropInput] = useState('');
  const [latitudeInput, setLatitudeInput] = useState('');
  const [longitudeInput, setLongitudeInput] = useState('');
  const [eventInput, setEventInput] = useState(eventList[0]);

  const makeStatusObject = () => ({
    name: nameInput,
    email: emailInput,
    cpf: CPFInput,
    crop: cropInput,
    date: dateInput,
    latitude_location: Number(latitudeInput),
    longitude_location: Number(longitudeInput),
    event: eventInput,
  });

  const isButtonDisabled = () => {
    const currentStatus = makeStatusObject();
    return !verifyAll(currentStatus);
  };

  const onClickRegisterButton = async () => {
    const newRegister = makeStatusObject();
    await register(newRegister);
    updateRequestArray();
  };

  return (
    <div>
      <h1>Cadastro de pedido</h1>
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

        <label htmlFor="crop-input">
          Tipo de lavoura:
          <input
            id="crop-input"
            type="text"
            value={cropInput}
            onChange={({ target: { value } }) => setCropInput(value)}
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
            type="text"
            value={latitudeInput}
            onChange={({ target: { value } }) => setLatitudeInput(value)}
          />
        </label>

        <label htmlFor="longitude-input">
          Longitude:
          <input
            id="longitude-input"
            type="text"
            value={longitudeInput}
            onChange={({ target: { value } }) => setLongitudeInput(value)}
          />
        </label>

        <label htmlFor="event-input">
          Evento:
          <select
            id="event-input"
            value={eventInput}
            onChange={({ target: { value } }) => setEventInput(value)}
          >
            { eventList.map((event) => <option value={event} key={`event-option-${event}`}>{ event.toLowerCase() }</option>) }
          </select>
        </label>

        <button
          disabled={isButtonDisabled()}
          type="button"
          onClick={onClickRegisterButton}
        >
          Cadastrar
        </button>

      </form>
    </div>
  );
}
