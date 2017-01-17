import React from 'react';
import styles from './css/header.css';
import { Link } from 'react-router';

const MenuItem = ({active, children, link}) => (
		<div className={styles.menu_item}>
			<Link to = {link}>
			{children}
			</Link>

		</div>
		)

const Header = () => {
	    return (
				        
				<div>
				
					<div className={styles.logo}>

						sparcs

					</div>

					<div className={styles.menu}>

						<MenuItem link="/">Meeting_schedule</MenuItem>

						<MenuItem link="/register_meeting">Register</MenuItem>

						<MenuItem>Vote</MenuItem>
						
						<MenuItem>Attendance</MenuItem>
					</div>
					
				</div>
																																				    );
};

export default Header;
