import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { ChildView } from './views/ChildView';
import { GiftsView } from './views/GiftsView';
import { NotFoundView } from './views/NotFoundView';
import { SingleGiftView } from './views/SingleGiftView';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/gift" element={<GiftsView />} />
        <Route path="/gift/:idGift" element={<SingleGiftView />} />
        <Route path="/child" element={<ChildView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
};
