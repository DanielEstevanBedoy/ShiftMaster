import { Drawer, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Link, useParams, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';



function NextWeekSchedulePage(){
    const { companyId } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        left: false,
      });
    
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
    };

    const goBack = () => {
        navigate(-1);
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
      
    return(
        <div>
        <Button onClick={goBack}>Back</Button> {/* Back button */}
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
        <h1>NextWeekSchedulePage</h1>
    </div>
    )
}

export default NextWeekSchedulePage;