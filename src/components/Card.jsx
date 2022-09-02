import React from 'react';
import { shape, number, string } from 'prop-types';

export default function Card({ request }) {
  return (
    <tr>
      <td>{request.id}</td>
      <td>{request.name}</td>
      <td>{request.email}</td>
      <td>{request.cpf}</td>
      <td>{request.date}</td>
      <td>{request.latitude_location}</td>
      <td>{request.longitude_location}</td>
      <td>{request.event}</td>
      <td>{request.create_at}</td>
    </tr>
  );
}

Card.propTypes = {
  request: shape({
    id: number,
    name: string,
    email: string,
    role: string,
  }).isRequired,
};
