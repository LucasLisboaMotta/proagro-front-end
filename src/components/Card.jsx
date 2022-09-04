import React, { useContext } from 'react';
import { shape, number, string } from 'prop-types';
import context from '../context/context';
import deleteRequest from '../api/deleteRequestById';

export default function Card({ request }) {
  const { updateRequestArray, setEditRequest } = useContext(context);

  const refactorCPF = (cpf) => {
    const newCPF = cpf.split('');
    newCPF.splice(3, 0, '.');
    newCPF.splice(7, 0, '.');
    newCPF.splice(11, 0, '-');
    return newCPF.join('');
  };

  const refactorDate = (date) => date.split('-').reverse().join('/');

  const buttonFunctionDeleteRequest = async (id) => {
    await deleteRequest(id);
    updateRequestArray();
  };

  const buttonFunctionEditRequest = () => setEditRequest({ edit: true, prevRequest: request });

  return (
    <tr>
      <td>{request.name}</td>
      <td>{request.email}</td>
      <td>{refactorCPF(request.cpf)}</td>
      <td>{request.crop}</td>
      <td>{refactorDate(request.date)}</td>
      <td>{request.latitude_location}</td>
      <td>{request.longitude_location}</td>
      <td>{request.event.toLowerCase()}</td>
      <td>{refactorDate(request.create_at)}</td>
      <td>
        <button type="button" onClick={buttonFunctionEditRequest}>
          Editar
        </button>
        <button type="button" onClick={() => buttonFunctionDeleteRequest(request.id)}>
          Excluir
        </button>
      </td>
    </tr>
  );
}

Card.propTypes = {
  request: shape({
    id: string,
    name: string,
    email: string,
    cpf: string,
    latitude_location: number,
    longitude_location: number,
    date: string,
    event: string,
    create_at: string,
    crop: string,
  }).isRequired,
};
