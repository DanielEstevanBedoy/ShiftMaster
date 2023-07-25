function SchedulePage({ match }) {
    const { companyId } = match.params;
  
    // Implement logic to fetch the schedule data for the specified company from Firebase.
    // Display the schedule information on this page.
  
    return (
      <div>
        <h2>Schedule for Company {companyId}</h2>
        {/* Display the schedule here */}
      </div>
    );
  }

  export default SchedulePage;