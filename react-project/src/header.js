import React from 'react';
import styles from './css/header.css';

const MenuItem = ({active, children, to}) => (
		<div className={styles.menu_item}>
		
			{children}

		</div>
		)

const Header = () => {
	    return (
				        
				<div>
				
					<div className={styles.logo}>

						sparcs

					</div>

					<div className={styles.menu}>

						<MenuItem>홈</MenuItem>

						<MenuItem>Meeting_schedule</MenuItem>

						<MenuItem>Vote</MenuItem>
						
						<MenuItem>Attendance</MenuItem>
					</div>
					
				</div>
																																				    );
};

export default Header;
