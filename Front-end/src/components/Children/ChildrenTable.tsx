import React from 'react';
import { ChildEntity, GiftEntity } from 'types';
import { ChildTableRow } from './ChildTableRow';

interface Props {
  children: ChildEntity[];
  gifts: GiftEntity[];
}
export const ChildrenTable = (props: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.children.map(child => (
          <ChildTableRow child={child} key={child.id} gifts={props.gifts} />
        ))}
      </tbody>
    </table>
  );
};
