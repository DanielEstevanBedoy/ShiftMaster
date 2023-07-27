import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue, push, remove, off,set } from "firebase/database";
import { database } from '../../firebase'; 
import { Drawer, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Box, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link} from 'react-router-dom';
import {auth} from "../../firebase";
function Employee() {
  const { companyId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState('');
  const [state, setState] = useState({
    left: false,
  });
  const navigate = useNavigate();
  const goBack = () =>{
    navigate(-1);
  }



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };



  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        {[
          { text: 'Current Schedule', link: '/schedule/:companyId'},
          { text: 'Create a New Schedule', link: `/schedule/${companyId}/create-new-schedule` },
          { text: 'Modify Current Schedule', link: `/schedule/${companyId}/modify-current-schedule` },
          { text: 'Create Schedule for Next Week', link: `/schedule/${companyId}/next-week-schedule` },
          { text: 'Employees', link: `/schedule/${companyId}/employees` },
          { text: 'DashBoard', link: '/dashboard'}

        
          
        ].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.link}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    const employeeRef = ref(database, `users/${auth.currentUser.uid}/companies/${companyId}/employees`);
    onValue(employeeRef, (snapshot) => {
        const data = snapshot.val();
        const employeesList = [];
        for (let id in data) {
            employeesList.push({ id, ...data[id] });
        }
        setEmployees(employeesList);
        console.log(employeesList);
    });
}, [companyId, auth.currentUser.uid]);

  





  const handleAddEmployee = async () => {
    const employeesRef = ref(database, `users/${auth.currentUser.uid}/companies/${companyId}/employees`);

    // Create a new ref with a unique id in Firebase.
    const newEmployeeRef = push(employeesRef);
    
    // Set the data at the new reference in Firebase.
    await set(newEmployeeRef, { name: newEmployee, id: newEmployeeRef.key });
    
    // Reset the new employee input field.
    setNewEmployee('');
};

  
  
const handleRemoveEmployee = (employeeId) => {
    const employeeRef = ref(database, `users/${auth.currentUser.uid}/companies/${companyId}/employees/${employeeId}`);
    remove(employeeRef);
};



  return (
    <Container maxWidth="lg">
    <Box sx={{ my: 4 }}>
      <Button onClick={goBack}>Back</Button> 

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6}>
          <h1>Add Employees</h1>
          <div>
            <TextField 
              label="New Employee"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </div>
        </Grid>
        
        <Grid item md={6}>
          <h1>Manage Employees</h1>
          <List>
            {employees.map((employee) => (
              <ListItem key={employee.id}>
                <ListItemText primary={employee.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveEmployee(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
        }
  export default Employee;
  