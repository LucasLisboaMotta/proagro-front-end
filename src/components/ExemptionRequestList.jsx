import React from 'react';
import { arrayOf, object } from 'prop-types';
import Card from './Card';

export default function ExemptionRequestList({ requestArray }) {
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
        {requestArray.map((request) => <Card request={request} />)}
      </tbody>
    </table>
  );
}

ExemptionRequestList.propTypes = ({ requestArray: arrayOf(object()).isRequired });
