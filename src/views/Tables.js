import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import axios from 'axios';

function Tables() {
  const [callbacks, setCallbacks] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page from the backend set to 8

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/calling');
      setData(response.data);
      setCallbacks(response.data)
      console.log("call backs are---->",callbacks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateEnum = async (index) => {
    try {
      const currentCallback = callbacks[index];
      
      console.log("curretnt cal back data is-->",currentCallback);

      if (currentCallback) {
        if (currentCallback.status !== 'cleared') {
          const updatedCallback = { ...currentCallback, status: 'cleared' };
          console.log('Updated Callback:', updatedCallback); 

          const response = await axios.put('http://localhost:5000/id', updatedCallback);
          console.log('Response:', response.data); 

          const updatedCallbacks = [...callbacks];
          updatedCallbacks[index] = response.data;
          setCallbacks(updatedCallbacks);
          alert('Status Updated Successfully');
          window.location.reload();
        } else {
          console.log('Status already cleared, skipping update');
          alert('You have already cleared the Status against the Id!');
        }
      } else {
        console.log('Callback not found at index:', index);
        alert('Callback not found!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Queries</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-white bg-dark">
                  <tr>
                    <th style={tableHeaderStyle}>User Id</th>
                    <th style={tableHeaderStyle}>First Name</th>
                    <th style={tableHeaderStyle}>Last Name</th>
                    <th style={tableHeaderStyle}>Phone Number</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={{ ...tableHeaderStyle, width: '800px' }}>Message</th>
                    <th style={tableHeaderStyle}>Created At</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item,index) => (
                    <tr key={item.id}>
                      <td style={tableCellStyle}>{item._id}</td>
                      <td style={tableCellStyle}>{item.fname}</td>
                      <td style={tableCellStyle}>{item.lname}</td>
                      <td style={tableCellStyle}>{item.pnumber}</td>
                      <td style={tableCellStyle}>{item.email}</td>
                      <td style={{ ...tableCellStyle, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.message}</td>
                      <td style={tableCellStyle}>{item.createdAt}</td>
                      <td style={tableCellStyle}>{item.status}</td>
                      <td style={tableCellStyle}>
                        <button style={updateButtonStyle} onClick={() => handleUpdateEnum(index)}>Update Status</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              <nav>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <a className="page-link" onClick={() => paginate(index + 1)} href="#!">
                        {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '12px', 
  textAlign: 'start',
};

const tableCellStyle = {
  padding: '23px',
  fontSize: '14px',

};
const updateButtonStyle = {
  backgroundColor: '#007bff', // Blue color
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Tables;
