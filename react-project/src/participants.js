import React from 'react';

const Participants = ({participants}) => (
		    
		<div>
			<label>Participants</label>			
				{participants.map(
						function(name){
							return( <li>{name}</li>);
						}
						)}
		</div>

		);
 
export default Participants;

//({id, onClick}) => (
//		    
//		<div className={styles.Navigate}>
//		
//			<Button color='teal' content="Previous" icon="angle left" labelPosition="left" 
//			onClick={
//				() => onClick('PREV')
//			}/> 
//
//			<div className={styles.Navigate_page_num}>{id}</div>
//																										        
//			<Button color='teal' content="Next" icon="angle right" labelPosition="right" 
//			onClick={
//				() => onClick('NEXT')
//			}
//			className={styles.Navigate_right_button}/>
//		</div>
//
//		);
 

