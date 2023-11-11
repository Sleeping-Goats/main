import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FaInfoCircle } from 'react-icons/fa';


const Header = ({ userName }) => {
    userName = "Sleeping Goat"
    const [isModalOpen, setModalOpen] = useState(false);

    const handleInfoClick = () => {
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
    };
  
    return (
      <header style={styles.header}>
        <div style={styles.centerContent}>
          <div style={styles.userName}>{userName}</div>
        </div>
        <div style={styles.rightIcons}>
          <div style={styles.iconContainer} onClick={handleInfoClick}>
            <FaInfoCircle style={styles.icon} />
          </div>
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box style={styles.modalBox}>
              <Typography id="modal-title" variant="h6" component="h2">
                Sustainable AI
              </Typography>
              <Typography id="modal-description" style={styles.modalText}>
                An AI  assistant constantly monitors and selects servers based on real-time data regarding energy sources. It will do it's thinking where ever the energy is the greenest!
              </Typography>
            </Box>
          </Modal>
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
          modalBox: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '2rem',
            outline: 'none',
          },
          modalText: {
            marginTop: '1rem',
          },
          closeIcon: {
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
          },
};

export default Header;
