import React from 'react';
import { shape, number, string } from 'prop-types';

export default function Card({ request }) {
  const refactorCPF = (cpf) => {
    const newCPF = cpf.split('');
    newCPF.splice(3, 0, '.');
    newCPF.splice(7, 0, '.');
    newCPF.splice(11, 0, '-');
    return newCPF.join('');
  };

  const refactorDate = (date) => date.split('-').reverse().join('/');

  return (
    <tr>
      <td>{request.id}</td>
      <td>{request.name}</td>
      <td>{request.email}</td>
      <td>{refactorCPF(request.cpf)}</td>
      <td>{refactorDate(request.date)}</td>
      <td>{request.latitude_location}</td>
      <td>{request.longitude_location}</td>
      <td>{request.event.toLowerCase()}</td>
      <td>{refactorDate(request.create_at)}</td>
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
  }).isRequired,
};
