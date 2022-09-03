import React, { useContext } from 'react';
import context from '../context/context';
import Card from './Card';

export default function ExemptionRequestList() {
  const { requestArray } = useContext(context);
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
          <th>Nome</th>
          <th>E-mail</th>
          <th>CPF</th>
          <th>Data do evento</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Tipo de evento</th>
          <th>Data da requisição</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {requestArray.sort(sortRequest).map(mapCards)}
      </tbody>
    </table>
  );
}
