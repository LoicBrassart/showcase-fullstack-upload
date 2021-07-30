import { useState } from 'react';
import axios from 'axios';
import SForm from './style';
import Card from '../Card';

export default function Form() {
  const [fields, setFields] = useState({});

  const handleChange = (evt) => {
    const newFields = { ...fields };
    newFields[evt.target.name] = evt.target.value;
    setFields(newFields);
  };

  const handleUpload = (evt) => {
    const newFields = { ...fields };
    newFields[evt.target.name] = {
      preview: URL.createObjectURL(evt.target.files[0]),
      raw: evt.target.files[0],
    };
    setFields(newFields);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const fData = new FormData();
    Object.entries(fields).forEach((field) => {
      const [key, value] = field;
      if (typeof value === 'object') {
        fData.append(key, value.raw);
      } else {
        fData.append(key, value);
      }
    });
    axios.post('http://localhost:5050/form', fData).catch(() => {});
  };

  return (
    <>
      <SForm onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            value={fields.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={fields.firstName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={fields.lastName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="avatar">
          Avatar:
          <input type="file" name="avatar" onChange={handleUpload} />
        </label>
        <label htmlFor="background">
          Background:
          <input type="file" name="background" onChange={handleUpload} />
        </label>
        <input type="submit" value="Send" />
      </SForm>
      <Card {...fields} />
    </>
  );
}
