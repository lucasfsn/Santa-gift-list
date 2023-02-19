import React from 'react';
import { AddChild } from '../components/AddChild/AddChild';
import { ChildrenList } from '../components/Children/ChildrenList';

export const ChildView = () => (
  <>
    <ChildrenList />
    <AddChild />
  </>
);
