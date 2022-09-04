import React, { useContext, useState } from 'react';
import context from '../context/context';
import TableHeader from './TableHeader';
import Card from './Card';
import createDivergentArray from '../utils/createDivergentArray';

export default function DivergentRequest() {
  const { requestArray } = useContext(context);
  const [divergentIndex, setDivergentIndex] = useState(0);

  const divergentArray = createDivergentArray(requestArray);

  const divergentMessage = divergentArray.length > 1
    ? `${divergentArray.length} divergências foram encontradas`
    : '1 divergência foi encontrada';

  divergentArray.sort(({ firstElement: { date: dateA } }, { secondElement: { date: dateB } }) => {
    if (new Date(dateA) < new Date(dateB)) return 1;
    if (new Date(dateA) > new Date(dateB)) return -1;
    return 0;
  });

  const decrementButton = () => {
    setDivergentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex > 0) return newIndex;
      return 0;
    });
  };

  const incrementButton = () => {
    setDivergentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < divergentArray.length) return newIndex;
      return divergentArray.length - 1;
    });
  };

  return (divergentArray.length > 0
    && (
    <div>
      <h2>{divergentMessage}</h2>

      <table>
        <TableHeader />
        <tbody>
          <Card
            key={`divergent-${divergentArray[divergentIndex].id}-${divergentArray[divergentIndex].firstElement.id}`}
            request={divergentArray[divergentIndex].firstElement}
          />
          <Card
            key={`divergent-${divergentArray[divergentIndex].id}-${divergentArray[divergentIndex].secondElement.id}`}
            request={divergentArray[divergentIndex].secondElement}
          />
        </tbody>
      </table>
      <button
        type="button"
        onClick={decrementButton}
        disabled={divergentIndex === 0}
      >
        {'<'}
      </button>
      <span>{divergentIndex + 1}</span>
      <button
        type="button"
        onClick={incrementButton}
        disabled={divergentIndex === divergentArray.length - 1}
      >
        {'>'}
      </button>
    </div>
    )
  );
}
