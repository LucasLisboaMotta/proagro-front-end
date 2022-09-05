import React, { useContext } from 'react';
import context from '../context/context';
import TableHeader from './TableHeader';
import FilterRequestList from './FilterRequestList';
import Card from './Card';

export default function ExemptionRequestList() {
  const { requestArray, useFilter, filterParams } = useContext(context);

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
          <FilterRequestList />
          <table>
            <TableHeader />
            <tbody>
              {
              useFilter
                ? requestArray.sort(sortRequest).filter(filterParams).map(mapCards)
                : requestArray.sort(sortRequest).map(mapCards)
              }
            </tbody>
          </table>
        </div>
      )
      : <div><h2>Nenhuma requisição encontrada</h2></div>
  );
}
