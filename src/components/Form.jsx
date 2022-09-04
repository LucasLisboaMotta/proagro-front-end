import React, { useState, useContext, useEffect } from 'react';
import context from '../context/context';
import {
  verifyAll,
  verifyCPF,
  verifyCrop,
  verifyDate,
  verifyEmail,
  verifyEvent,
  verifyLatitude,
  verifyLongitude,
  verifyName,
} from '../utils/verifyInputs';
import postRequest from '../api/registerExemptionRequests';
import updateRequest from '../api/updateRegister';
import eventList from '../utils/eventList';

export default function Form() {
  const { updateRequestArray, editRequest, setEditRequest } = useContext(context);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [CPFInput, setCPFInput] = useState('');
  const [cropInput, setCropInput] = useState('');
  const [latitudeInput, setLatitudeInput] = useState('');
  const [longitudeInput, setLongitudeInput] = useState('');
  const [eventInput, setEventInput] = useState(eventList[0]);

  const makeStateObject = () => ({
    name: nameInput,
    email: emailInput,
    cpf: CPFInput,
    crop: cropInput,
    date: dateInput,
    latitude_location: Number(latitudeInput),
    longitude_location: Number(longitudeInput),
    event: eventInput,
  });

  const clearAllInputs = () => {
    setNameInput('');
    setEmailInput('');
    setDateInput('');
    setCPFInput('');
    setCropInput('');
    setLatitudeInput('');
    setLongitudeInput('');
    setEventInput('');
  };

  const isButtonDisabled = () => {
    const currentState = makeStateObject();
    return !verifyAll(currentState);
  };

  const onClickRegisterButton = async () => {
    const newRegister = makeStateObject();
    await postRequest(newRegister);
    updateRequestArray();
    clearAllInputs();
  };

  const onClickUpdateButton = async () => {
    const newRegister = makeStateObject();
    await updateRequest(editRequest.prevRequest.id, newRegister);
    updateRequestArray();
    setEditRequest({ edit: false, prevRequest: {} });
  };

  useEffect(() => {
    const updateState = () => {
      if (editRequest.edit) {
        setNameInput(editRequest.prevRequest?.name);
        setEmailInput(editRequest.prevRequest?.email);
        setDateInput(editRequest.prevRequest?.date);
        setCPFInput(editRequest.prevRequest?.cpf);
        setCropInput(editRequest.prevRequest?.crop);
        setLatitudeInput(editRequest.prevRequest?.latitude_location);
        setLongitudeInput(editRequest.prevRequest?.longitude_location);
        setEventInput(editRequest.prevRequest?.event);
      } else {
        clearAllInputs();
      }
    };
    updateState();
  }, [editRequest]);

  return (
    <div>
      <h1>
        {editRequest.edit ? 'Atualização' : 'Cadastro'}
        {' '}
        de pedido
      </h1>
      {editRequest.edit && (
        <button
          type="button"
          onClick={() => setEditRequest({ edit: false, prevRequest: {} })}
        >
          Cancelar edição
        </button>
      )}
      <form>
        <label htmlFor="name-input">
          Nome:
          <input
            id="name-input"
            type="text"
            value={nameInput}
            onChange={({ target: { value } }) => setNameInput(value)}
          />
          {verifyName(nameInput) ? 'V' : 'X'}
        </label>

        <label htmlFor="email-input">
          E-mail:
          <input
            id="email-input"
            type="text"
            value={emailInput}
            onChange={({ target: { value } }) => setEmailInput(value)}
          />
          {verifyEmail(emailInput) ? 'V' : 'X'}
        </label>

        <label htmlFor="CPF-input">
          CPF:
          <input
            id="CPF-input"
            type="text"
            value={CPFInput}
            onChange={({ target: { value } }) => setCPFInput(value)}
          />
          {verifyCPF(CPFInput) ? 'V' : 'X'}
        </label>

        <label htmlFor="crop-input">
          Tipo de lavoura:
          <input
            id="crop-input"
            type="text"
            value={cropInput}
            onChange={({ target: { value } }) => setCropInput(value)}
          />
          {verifyCrop(cropInput) ? 'V' : 'X'}
        </label>

        <label htmlFor="date-input">
          Data:
          <input
            id="date-input"
            type="date"
            value={dateInput}
            onChange={({ target: { value } }) => setDateInput(value)}
          />
          {verifyDate(dateInput) ? 'V' : 'X'}
        </label>

        <label htmlFor="latitude-input">
          Latitude:
          <input
            id="latitude-input"
            type="text"
            value={latitudeInput}
            onChange={({ target: { value } }) => setLatitudeInput(value)}
          />
          {verifyLatitude(Number(latitudeInput)) ? 'V' : 'X'}
        </label>

        <label htmlFor="longitude-input">
          Longitude:
          <input
            id="longitude-input"
            type="text"
            value={longitudeInput}
            onChange={({ target: { value } }) => setLongitudeInput(value)}
          />
          {verifyLongitude(Number(longitudeInput)) ? 'V' : 'X'}
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
          {verifyEvent(eventInput) ? 'V' : 'X'}
        </label>

        <button
          disabled={isButtonDisabled()}
          type="button"
          onClick={editRequest.edit ? onClickUpdateButton : onClickRegisterButton}
        >
          {editRequest.edit ? 'Atualizar' : 'Cadastrar' }
        </button>

      </form>
    </div>
  );
}
