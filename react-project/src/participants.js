import React from 'react';

const Participants = ({id, onClick}) => (

  <div className={styles.Navigate}>

    <Button color='teal' content="Previous" icon="angle left" labelPosition="left"
      onClick={
        () => onClick('PREV')
      }/>

    <div className={styles.Navigate_page_num}>{id}</div>

    <Button color='teal' content="Next" icon="angle right" labelPosition="right" 
      onClick={
        () => onClick('NEXT')
      }
      className={styles.Navigate_right_button}/>
  </div>

);

export default Partici;
