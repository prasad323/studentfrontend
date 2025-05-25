import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Form, Button } from 'react-bootstrap';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      Swal.fire('Success!', 'Student added!', 'success');
      setName('');
      setEmail('');
    } else {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>👤 Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter student's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>📧 Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter student's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">➕ Add Student</Button>
    </Form>
  );
};

export default StudentForm;
