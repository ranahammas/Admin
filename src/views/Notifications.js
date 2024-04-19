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

function Notifications() {
  const [callbacks, setCallbacks] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page from the backend set to 8

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/kamial');
      setData(response.data)
      setCallbacks(response.data);
      console.log("callbacks are--->",response.data);
      console.log("data is fetched--->", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
 
  const handleUpdateEnum = async (index) => {
    try {
      // Assuming callbacks is an object with a 'data' property
      if (callbacks && callbacks.data) {
        const currentCallback = callbacks.data[index];
        console.log("current callback data is-->", currentCallback);
  
        if (currentCallback) {
          if (currentCallback.status !== 'cleared') {
            const updatedCallback = { ...currentCallback, status: 'cleared' };
            console.log('Updated Callback:', updatedCallback); 
  
            const response = await axios.put('http://localhost:5000/pasa', updatedCallback);
            // Assuming callbacks is immutable, create a new object with the updated data
            const updatedCallbacks = { ...callbacks };
            updatedCallbacks.data[index] = response.data;
            alert('Status Updated Successfully');
            setCallbacks(updatedCallbacks);
            window.location.reload();
          } else {
            console.log('Status already cleared, skipping update');
            alert('You have already cleared the status against the ID!');
          }
        } else {
          console.log('Callback not found at index:', index);
          alert('Callback not found!');
        }
      } else {
        console.log('Callbacks data not available or in incorrect format');
        alert('Callbacks data not available or in incorrect format!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  // Pagination
  // Pagination
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  console.log("Data:", data);
  console.log("Index of First Item:", indexOfFirstItem);
  console.log("Index of Last Item:", indexOfLastItem);
  const currentItems = Array.isArray(data.data) ? data.data.slice(indexOfFirstItem, indexOfLastItem) : [];

  console.log("Current Items", currentItems);


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
                    <th style={{ ...tableHeaderStyle, width: '800px', height: 'auto' }}>Image</th>
                    <th style={tableHeaderStyle}>Created At</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("current:", currentItems)}
                  {currentItems.map((item, index) => (

                    <tr key={index}>
                      <td style={tableCellStyle}>{item._id}</td>
                      <td style={tableCellStyle}>{item.fname}</td>
                      <td style={tableCellStyle}>{item.lname}</td>
                      <td style={tableCellStyle}>{item.pnumber}</td>
                      <td style={tableCellStyle}>{item.email}</td>
                      <td style={{ ...tableCellStyle, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <img src={item.image} alt="User Image" style={{ maxWidth: '100%', height: 'auto' }} />
                      </td>

                      <td style={tableCellStyle}>{item.createdAt}</td>
                      <td style={tableCellStyle}>{item.status}</td>
                      <td style={tableCellStyle}>
                        <button style={updateButtonStyle} onClick={() => handleUpdateEnum(index)}>Status update</button>
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
  backgroundColor: 'blue', // Blue color
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

export default Notifications;
