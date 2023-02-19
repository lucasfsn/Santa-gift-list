import React, { FormEvent, useState } from 'react';
import { CreateGiftReq, GiftEntity } from 'types';
import { Spinner } from '../common/Spinner/Spinner';

export const AddGift = () => {
  const [form, setForm] = useState<CreateGiftReq>({
    name: '',
    quantity: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [resultInfo, setResultInfo] = useState<string | null>(null);

  const updateForm = (key: string, value: any) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/gift`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data: GiftEntity = await res.json();

      setResultInfo(`${data.name} added with ID: ${data.id}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (resultInfo !== null) {
    return (
      <div>
        <p>{resultInfo}</p>
        <button onClick={() => setResultInfo(null)}>Add another gift</button>
      </div>
    );
  }

  return (
    <form onSubmit={sendForm}>
      <h2>Add gift</h2>
      <label>
        Name:{' '}
        <input
          type="text"
          value={form.name}
          onChange={e => updateForm('name', e.target.value)}
        />
      </label>
      <label>
        Count:{' '}
        <input
          type="number"
          value={form.quantity}
          onChange={e => updateForm('quantity', Number(e.target.value))}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};
