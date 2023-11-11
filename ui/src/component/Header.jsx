import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FaInfoCircle } from 'react-icons/fa'; // Import the info icon of your choice

const Header = ({ userName }) => {
    userName = "Sleeping Goat"
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'info-popover' : undefined;

  return (
    <header style={styles.header}>
      <div style={styles.centerContent}>
        <div style={styles.userName}>{userName}</div>
      </div>
      <div style={styles.rightIcons}>
        <div style={styles.iconContainer} onClick={handleInfoClick}>
          <FaInfoCircle style={styles.icon} />
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>THE SLEEPING GOAT</Typography>
        </Popover>
      </div>
    </header>
  );
};

const styles = {
    header: {
            backgroundColor: '#8DC1E6',
            color: '#fff',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between', // Spacing between center and right content
            alignItems: 'center',
            fontSize: '30px',
          },
          centerContent: {
            flex: 1,
            textAlign: 'center',
          },
          userName: {
            fontWeight: 'bold',
          },
          rightIcons: {
            display: 'flex',
            alignItems: 'center',
          },
          icon: {
            fontSize: '1.5rem',
            cursor: 'pointer',
            position: 'relative',
          },
};

export default Header;
