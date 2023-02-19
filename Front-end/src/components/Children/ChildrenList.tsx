import React, { useEffect, useState } from 'react';
import { ListChildrenRes } from 'types';
import { Spinner } from '../common/Spinner/Spinner';
import { ChildrenTable } from './ChildrenTable';

export const ChildrenList = () => {
  const [data, setData] = useState<ListChildrenRes | null>(null);

  const refreshChildren = async () => {
    const res = await fetch('http://localhost:3001/child');
    setData(await res.json());
  };

  useEffect(() => {
    refreshChildren();
  });

  if (data === null) {
    return <Spinner />;
  }
  // console.log(data);

  return (
    <>
      <h1>Children</h1>
      <ChildrenTable children={data.childrenList} gifts={data.giftsList} />
    </>
  );
};
