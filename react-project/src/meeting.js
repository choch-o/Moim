import React from 'react';
import styles from './meeting.css';

const Meeting = ({title, content}) => (
		    <div className={styles.meeting}>
			        
				<h1>{title}</h1>
			
				<p>{content}</p>

			</div>
		);
 
export default Meeting;
