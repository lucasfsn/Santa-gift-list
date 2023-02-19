import React from 'react';
import { ChildEntity, GiftEntity } from 'types';
import { ChildGiftSelector } from '../ChildGiftSelector/ChildGiftSelector';

interface Props {
  child: ChildEntity;
  gifts: GiftEntity[];
}

export const ChildTableRow = (props: Props) => {
  return (
    <tr>
      <td>{props.child.name}</td>
      <td>
        <ChildGiftSelector
          giftsList={props.gifts}
          selectedId={props.child.giftId}
          childId={props.child.id as string}
        />
      </td>
    </tr>
  );
};
