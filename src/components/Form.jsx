import React, { useState, useContext, useEffect } from 'react';
import {
  Form, Button, Row, Col, ButtonGroup,
} from 'bootstrap-4-react';
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
import MarkImage from './MarkImage';
import postRequest from '../api/registerExemptionRequests';
import updateRequest from '../api/updateRegister';
import eventList from '../utils/eventList';
import '../style/Form.css';

export default function RegisterForm() {
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
        de requisição
      </h1>

      <Form>
        <Form.Group>
          <Row>
            <Form.LabelCol col="sm-2" htmlFor="name-input">
              Nome:
              <MarkImage isCheck={verifyName(nameInput)} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Input
                id="name-input"
                type="text"
                value={nameInput}
                onChange={({ target: { value } }) => setNameInput(value)}
              />
            </Col>
          </Row>
          <Row>

            <Form.LabelCol col="sm-2" htmlFor="email-input">
              E-mail:
              <MarkImage isCheck={verifyEmail(emailInput)} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Input
                id="email-input"
                type="text"
                value={emailInput}
                onChange={({ target: { value } }) => setEmailInput(value)}
              />
            </Col>
          </Row>

          <Row>
            <Form.LabelCol col="sm-2" htmlFor="CPF-input">
              CPF:
              <MarkImage isCheck={verifyCPF(CPFInput)} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Input
                id="CPF-input"
                type="text"
                value={CPFInput}
                onChange={({ target: { value } }) => setCPFInput(value)}
              />
            </Col>
          </Row>

          <Row>
            <Form.LabelCol col="sm-2" htmlFor="crop-input">
              Lavoura:
              <MarkImage isCheck={verifyCrop(cropInput)} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Input
                id="crop-input"
                type="text"
                value={cropInput}
                onChange={({ target: { value } }) => setCropInput(value)}
              />
            </Col>
          </Row>

          <Row>
            <Form.LabelCol col="sm-2" htmlFor="date-input">
              Data:
              <MarkImage isCheck={verifyDate(dateInput)} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Input
                id="date-input"
                type="date"
                value={dateInput}
                onChange={({ target: { value } }) => setDateInput(value)}
              />
            </Col>
          </Row>

          <Row>
            <Form.LabelCol col="sm-2" htmlFor="latitude-input">
              Latitude:
              <MarkImage isCheck={verifyLatitude(Number(latitudeInput))} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Input
                id="latitude-input"
                type="text"
                value={latitudeInput}
                onChange={({ target: { value } }) => setLatitudeInput(value)}
              />
            </Col>
          </Row>

          <Row>
            <Form.LabelCol col="sm-2" htmlFor="longitude-input">
              Longitude:
              <MarkImage isCheck={verifyLongitude(Number(longitudeInput))} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Input
                id="longitude-input"
                type="text"
                value={longitudeInput}
                onChange={({ target: { value } }) => setLongitudeInput(value)}
              />
            </Col>
          </Row>

          <Row>
            <Form.LabelCol col="sm-2" htmlFor="event-input">
              Evento:
              <MarkImage isCheck={verifyEvent(eventInput)} />
            </Form.LabelCol>
            <Col col="sm-10">
              <Form.Select
                id="event-input"
                value={eventInput}
                onChange={({ target: { value } }) => setEventInput(value)}
              >
                { eventList.map((event) => <option value={event} key={`event-option-${event}`}>{ event.toLowerCase() }</option>) }
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <ButtonGroup aria-label="Basic example">
          {editRequest.edit && (
          <Button
            light
            lg
            type="button"
            onClick={() => setEditRequest({ edit: false, prevRequest: {} })}
          >
            Cancelar edição
          </Button>
          )}
          <Button
            lg
            primary
            disabled={isButtonDisabled()}
            type="button"
            onClick={editRequest.edit ? onClickUpdateButton : onClickRegisterButton}
          >
            {editRequest.edit ? 'Atualizar' : 'Cadastrar' }
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}
