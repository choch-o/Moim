import React from 'react';
import styles from './meeting_header.css';



const Meeting_wrapper = ({children, date}) => {
	    return (
				        
				<div className="meeting_wrapper">
					<div className={styles.Header}>{date}</div>
					{children}

				</div>

			   );
};
 
export default Meeting_wrapper;
