import React, {useState} from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Import the info icon of your choice





const Header = ({ userName }) => {
    const [isPopoverOpen, setPopoverOpen] = useState(false);
  
    const handleInfoClick = () => {
      setPopoverOpen(!isPopoverOpen);
    };
  
    return (
      <header style={styles.header}>
        <div style={styles.centerContent}>
          <div style={styles.userName}>{userName}</div>
        </div>
        <div style={styles.rightIcons}>
          <div style={styles.iconContainer} onClick={handleInfoClick}>
            <FaInfoCircle style={styles.icon} />
            {isPopoverOpen && (
              <div style={styles.popover}>
                {"life in a dream house"}
                Info Popover Content
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };








// const Header = ({ userName }) => {
//     userName = "Sleeping Goat";
//   return (
//     <header style={styles.header}>
//       <div style={styles.centerContent}>
//         <div style={styles.userName}>{userName}</div>
//       </div>
//       <div style={styles.rightIcons}>
//         <FaInfoCircle style={styles.icon} />
//       </div>
//     </header>
//   );
// };

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
  popover: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    display: 'none', // Initially hide the popover
  },
};



export default Header;
