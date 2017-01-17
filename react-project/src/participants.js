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

