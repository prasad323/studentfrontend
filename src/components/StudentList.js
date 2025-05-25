import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Table, Button, Row, Col } from 'react-bootstrap';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async () => {
    const res = await fetch(`http://localhost:5000/students?page=${page}&limit=${limit}`);
    const data = await res.json();
    setStudents(data.students);
    setTotalPages(Math.ceil(data.total / limit));
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const deleteStudent = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the student!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:5000/students/${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire('Deleted!', 'Student has been deleted.', 'success');
          fetchStudents();
        } else {
          Swal.fire('Error', 'Failed to delete student', 'error');
        }
      }
    });
  };

  return (
    <div>
      <h4 className="mb-3">📋 Student List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>📧 Email</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteStudent(student.id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No students found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ⬅️ Previous
          </Button>
        </Col>
        <Col className="text-center">Page {page} of {totalPages}</Col>
        <Col xs="auto">
          <Button
            variant="secondary"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ➡️
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StudentList;
