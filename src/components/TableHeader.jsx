import React from 'react';

export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">E-mail</th>
        <th scope="col">CPF</th>
        <th scope="col">Lavoura</th>
        <th scope="col">Data do evento</th>
        <th scope="col">Latitude</th>
        <th scope="col">Longitude</th>
        <th scope="col">Evento</th>
        <th scope="col">Data da requisição</th>
        <th scope="col">Editar/Excluir</th>
      </tr>
    </thead>
  );
}
