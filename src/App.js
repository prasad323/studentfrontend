import React from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Management</h2>
      <StudentForm />
      <hr />
      <StudentList />
    </div>
  );
}

export default App;