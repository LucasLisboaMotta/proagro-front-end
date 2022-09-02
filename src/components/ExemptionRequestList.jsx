import React from 'react';
import {
  arrayOf, shape, number, string,
} from 'prop-types';
import Card from './Card';

export default function ExemptionRequestList({ requestArray }) {
  const sortRequest = ({ create_at: createA }, { create_at: createB }) => {
    if (new Date(createA) < new Date(createB)) return 1;
    if (new Date(createA) > new Date(createB)) return -1;
    return 0;
  };

  const mapCards = (request) => <Card request={request} key={`card-list-${request.id}`} />;

  return (
    <table>
      <thead>
        <tr>
          <th>Identificador</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>CPF</th>
          <th>Data do evento</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Tipo de evento</th>
          <th>Data da requisição</th>
        </tr>
      </thead>
      <tbody>
        {requestArray.sort(sortRequest).map(mapCards)}
      </tbody>
    </table>
  );
}

ExemptionRequestList.propTypes = ({
  requestArray: arrayOf(shape({
    id: string,
    name: string,
    email: string,
    cpf: string,
    latitude_location: number,
    longitude_location: number,
    date: string,
    event: string,
    create_at: string,
  }).isRequired).isRequired,
});
