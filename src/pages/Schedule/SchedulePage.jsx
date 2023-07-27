import React, { useState, useEffect } from 'react';
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { Paper, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {Link, useParams } from 'react-router-dom';
import { ref, onValue, off } from "firebase/database";
import { database } from '../../firebase'; 

function SchedulePage() {
  const { companyId } = useParams();
  const [schedulerData, setSchedulerData] = useState([]);
  const [state, setState] = useState({
    left: false,
  });

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
          { text: 'Employees', link: `/schedule/${companyId}/employees` }

        ].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.link}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    const employeesRef = ref(database, `users/${companyId}/employees`);
    const listener = onValue(employeesRef, (snapshot) => {
      const employeesData = snapshot.val();
      const employeesList = [];
      for (let id in employeesData) {
        const employeeData = employeesData[id];
        const schedules = employeeData.schedules || [];
        schedules.forEach(schedule => {
          // Map each schedule to a format that can be recognized by dx-react-scheduler
          employeesList.push({
            startDate: schedule.start,
            endDate: schedule.end,
            title: employeeData.name
          });
        });
      }
      setSchedulerData(employeesList);
    });

    // Unsubscribe from the database when the component unmounts
    return () => off(employeesRef, listener);
  }, [companyId]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
      <Paper style={{ height: '90vh', width: '75vw', overflow: 'hidden' }}>
        <Scheduler data={schedulerData}>
          <ViewState />
          <WeekView startDayHour={7} endDayHour={23} cellDuration={60} />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
}

export default SchedulePage;
