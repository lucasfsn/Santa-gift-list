import React from 'react';
import { AddGift } from '../components/AddGift/AddGift';
import { GiftsList } from '../components/Gifts/GiftsList';

export const GiftsView = () => (
  <>
    <GiftsList />
    <AddGift />
  </>
);
