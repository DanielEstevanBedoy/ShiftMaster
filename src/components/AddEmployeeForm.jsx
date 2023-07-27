import {useState} from 'react';


function AddEmployeeForm({ onAdd }) {
    const [employeeName, setEmployeeName] = useState('');
    
    const handleSubmit = (event) => {
      event.preventDefault();
      
      onAdd(employeeName);
      
      setEmployeeName('');
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={employeeName}
          onChange={(event) => setEmployeeName(event.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
    );
  }
  
  
  
  
  export default AddEmployeeForm;