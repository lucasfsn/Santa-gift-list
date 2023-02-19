import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetSingleGiftRes } from 'types';

export const SingleGiftView = () => {
  const [giftInfo, setGiftInfo] = useState<GetSingleGiftRes | null>(null);
  const { idGift } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/gift/${idGift}`);
      setGiftInfo(await res.json());
    })();
  }, []);

  if (giftInfo === null) {
    return null;
  }

  return (
    <>
      <h2>Test</h2>
      <h1>{giftInfo.gift.name}</h1>
      <p>
        This gift has ID: {giftInfo.gift.id}. Quantity: {giftInfo.gift.quantity}{' '}
        and {giftInfo.givenCount} were already given.
      </p>
      <p>
        <Link to="/gift">Go back</Link>
      </p>
    </>
  );
};
