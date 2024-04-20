import React from 'react';
import './table.css';  // Import CSS for styling

const TableComponent = ({ firstname, lastname, address, age, education, schoolname, mothername, fathername, hobbies, sibling, aim }) => {
  return (
    <table className="profile-table">
      <tbody>
        <tr><th>Name </th><td>{firstname} {lastname}</td></tr>
        <tr><th>Address</th><td>{address}</td></tr>
        <tr><th>Age</th><td>{age}</td></tr>
        <tr><th>Education</th><td>{education}</td></tr>
        <tr><th>School Name</th><td>{schoolname}</td></tr>
        <tr><th>Mother's Name</th><td>{mothername}</td></tr>
        <tr><th>Father's Name</th><td>{fathername}</td></tr>
        <tr>
            <th>Hobbies</th>
            <td>
                <ul>
                    {hobbies.map((hobby, index) => (
                        <li key={index}>{hobby}</li>
                    ))}
                </ul>
            </td>
        </tr>
        <tr>
            <th>Sibling</th>
            <td>
                <ul>
                    {sibling.map((data, index) => (
                        <li key={index}>{data}</li>
                    ))}
                </ul>
            </td>
        </tr>
        <tr>
            <th>Aim</th>
            <td>
                <ul>
                    {aim.map((data, index) => (
                        <li key={index}>{data}</li>
                    ))}
                </ul>
            </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableComponent;