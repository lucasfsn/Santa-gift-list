import React, { FormEvent, useState } from 'react';
import { GiftEntity, SetGiftForChildReq } from 'types';
import { Spinner } from '../common/Spinner/Spinner';

interface Props {
  giftsList: GiftEntity[];
  selectedId: string;
  childId: string;
}
export const ChildGiftSelector = (props: Props) => {
  const [selected, setSelected] = useState<string>(props.selectedId);
  const [loading, setLoading] = useState<boolean>(false);

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await fetch(`http://localhost:3001/child/gift/${props.childId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ giftId: selected } as SetGiftForChildReq),
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={sendForm}>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        {props.giftsList.map(gift => (
          <option key={gift.id} value={gift.id}>
            {gift.name}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};
