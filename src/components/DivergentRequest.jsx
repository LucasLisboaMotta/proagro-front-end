import React, { useContext, useState } from 'react';
import context from '../context/context';
import TableHeader from './TableHeader';
import Card from './Card';
import createDivergentArray from '../utils/createDivergentArray';

export default function DivergentRequest() {
  const { requestArray } = useContext(context);
  const [showDivergent, setShowDivergent] = useState(false);

  const divergentArray = createDivergentArray(requestArray);

  const divergentMessage = divergentArray.length > 1
    ? `${divergentArray.length} divergências foram encontradas`
    : '1 divergência foi encontrada';

  divergentArray.sort(({ firstElement: { date: dateA } }, { secondElement: { date: dateB } }) => {
    if (new Date(dateA) < new Date(dateB)) return 1;
    if (new Date(dateA) > new Date(dateB)) return -1;
    return 0;
  });

  return (divergentArray.length > 0
    && (
    <div>
      <h2>{divergentMessage}</h2>
      <label htmlFor="divergent-checkbox">
        Mostrar divergências?
        <input
          id="divergent-checkbox"
          type="checkbox"
          value={showDivergent}
          onChange={({ target: { checked } }) => setShowDivergent(checked)}
        />
      </label>
      {showDivergent && (
      <table>
        <TableHeader />
        <tbody>
          {divergentArray.map((el) => (
            <>
              <Card key={`divergent - ${el.id} - ${el.firstElement.id}`} request={el.firstElement} />
              <Card key={`divergent - ${el.id} - ${el.secondElement.id}`} request={el.secondElement} />
            </>
          ))}
        </tbody>
      </table>
      )}
    </div>
    )
  );
}
