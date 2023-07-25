import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import {
  Scheduler,
  WeekView,
  Appointments,
  Resources,
  ViewState,
} from '@devexpress/dx-react-scheduler-material-ui';
import { database } from '../firebase'; // Assuming you have set up Firebase in the project

function SchedulePage({ match }) {
  const { companyId } = match.params;
  const [schedulerData, setSchedulerData] = useState([]);

  useEffect(() => {
    // Implement logic to fetch and display the schedule data for the specified company from Firebase.
    const companyScheduleRef = database.ref(`companies/${companyId}/schedule`);
    companyScheduleRef.on('value', (snapshot) => {
      const scheduleData = snapshot.val();
      const scheduleArray = scheduleData ? Object.values(scheduleData) : [];
      setSchedulerData(scheduleArray);
    });

    // Unsubscribe from the database when the component unmounts
    return () => companyScheduleRef.off('value');
  }, [companyId]);

  const resources = [
    {
      fieldName: 'employeeId',
      title: 'Employees',
      instances: [
        { id: 1, text: 'John Doe' },
        { id: 2, text: 'Jane Smith' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper style={{ height: '90vh', width: '75vw', overflow: 'hidden' }}>
        <Scheduler data={schedulerData}>
          <ViewState />
          <WeekView startDayHour={7} endDayHour={23} cellDuration={60} />
          <Resources data={resources} />
          {/* Add any additional configurations for the scheduler */}
          {/* For example, you can customize the appearance of appointments with Appointments component */}
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
}

export default SchedulePage;
