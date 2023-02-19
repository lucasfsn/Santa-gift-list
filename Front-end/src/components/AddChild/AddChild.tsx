import React, { FormEvent, useState } from 'react';
import { ChildEntity, CreateChildReq } from 'types';
import { Spinner } from '../common/Spinner/Spinner';

export const AddChild = () => {
  const [form, setForm] = useState<CreateChildReq>({
    name: '',
    giftId: '',
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
      const res = await fetch(`http://localhost:3001/child`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data: ChildEntity = await res.json();

      setResultInfo(`${data.name} has been added to Santa's List.`);
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
        <button onClick={() => setResultInfo(null)}>Add another child</button>
      </div>
    );
  }

  return (
    <form onSubmit={sendForm}>
      <h2>Add child</h2>
      <label>
        Name:{' '}
        <input
          type="text"
          value={form.name}
          onChange={e => updateForm('name', e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};
