import React, { useContext } from 'react';
import context from '../context/context';
import TableHeader from './TableHeader';
import Card from './Card';

export default function ExemptionRequestList() {
  const { requestArray } = useContext(context);

  const sortRequest = (
    { create_at: createA, name: nameA },
    { create_at: createB, name: nameB },
  ) => {
    if (new Date(createA) < new Date(createB)) return 1;
    if (new Date(createA) > new Date(createB)) return -1;
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  };

  const mapCards = (request) => <Card request={request} key={`card-list-${request.id}`} />;

  return (
    requestArray.length > 0
      ? (
        <div>
          <h2>Requisições feitas</h2>
          <table>
            <TableHeader />
            <tbody>
              {requestArray.sort(sortRequest).map(mapCards)}
            </tbody>
          </table>
        </div>
      )
      : <div><h2>Nenhuma requisição encontrada</h2></div>
  );
}
