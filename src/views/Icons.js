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


function Icons() {
  const [callbacks, setCallbacks] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page from the backend set to 8
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/all-the-users');
      setData(response.data);
      setCallbacks(response.data)
      console.log("call backs are---->", callbacks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const deleteRecord = (_id, e) => {
  
    e.preventDefault();
    axios.delete(`http://localhost:5000/dell/:_id`, { data: { _id } })
      .then((response) => {
          alert("Data Deleted from Database")
          window.location.reload()
        console.log(response);

      })
      .catch(err => console.log(err));
    
  };


  const handlePrint = () => {
    window.print();
  };

  // const handleUpdateEnum = async (index) => {
  //   try {
  //     const currentCallback = callbacks[index];

  //     console.log("curretnt cal back data is-->",currentCallback);

  //     if (currentCallback) {
  //       if (currentCallback.status !== 'cleared') {
  //         const updatedCallback = { ...currentCallback, status: 'cleared' };
  //         console.log('Updated Callback:', updatedCallback); 

  //         const response = await axios.put('http://localhost:5000/kamial', updatedCallback);
  //         console.log('Response:', response.data); 

  //         const updatedCallbacks = [...callbacks];
  //         updatedCallbacks[index] = response.data;
  //         setCallbacks(updatedCallbacks);

  //         alert('Status Updated Successfully');
  //         window.location.reload();
  //       } else {
  //         console.log('Status already cleared, skipping update');
  //         alert('You have already cleared the Status against the Id!');
  //       }
  //     } else {
  //       console.log('Callback not found at index:', index);
  //       alert('Callback not found!');
  //     }
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };





  // const handleDeleteUser = async (_id) => {
  //   try {
  //     if (!_id) {
  //       throw new Error('User ID is required');
  //     }

  //     const idString = _id.toString(); 

  //     const response = await axios.delete(`http://localhost:5000/dell/:_id${_id}`, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //      data:{idString}   

  //     });
  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.error('Error deleting user:', error.message);
  //   }
  // };




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
              <CardTitle tag="h4">User In System</CardTitle>
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
                    <th style={{ ...tableHeaderStyle, width: '800px' }}>Address</th>
                    <th style={tableHeaderStyle}> city</th>
                    <th style={tableHeaderStyle}>Created At</th>
                    <th style={tableHeaderStyle}>Logged iN AS</th>
                    <th style={tableHeaderStyle}>Actions</th>
                    <th style={tableHeaderStyle}></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td style={tableCellStyle}>{item._id}</td>
                      <td style={tableCellStyle}>{item.fname}</td>
                      <td style={tableCellStyle}>{item.lname}</td>
                      <td style={tableCellStyle}>{item.pnumber}</td>
                      <td style={tableCellStyle}>{item.email}</td>
                      <td style={{ ...tableCellStyle, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.address}</td>
                      <td style={tableCellStyle}>{item.city}</td>
                      <td style={tableCellStyle}>{item.createdAt}</td>
                      <td style={tableCellStyle}>{item.role}</td>
                      <td style={tableCellStyle}>
                        <button style={updateButtonStyle} onClick={(e) => deleteRecord(item._id, e)}>Delete User </button>
                      </td>
                       <td style={tableCellStyle}>
               

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
  padding: '20px',
  textAlign: 'start',
};

const tableCellStyle = {
  padding: '15px 50px',
  fontSize: '14px',

};
const updateButtonStyle = {
  backgroundColor: 'crimson', // Blue color
  color: 'white',
  border: 'none',
  flex:'1',
  padding: '12px',
  marginRight:'40px',  
  width: '110px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Icons;
