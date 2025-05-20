// src/components/PowerBIDashboard.js

import React from 'react';

const PowerBIDashboard = () => {
  return (
    <div style={styles.container}>
      <iframe
        title="MSTS MIS V2"
        src="https://app.powerbi.com/view?r=eyJrIjoiZGQ2YWQ5ZjEtYTU5OC00OTBjLTg2ZGItN2RkN2IyOGZlN2UzIiwidCI6IjI4OWNiODYyLWQ0YTMtNDFhMC1hY2Y4LTg4MGRkMDcxOTc0MyIsImMiOjEwfQ%3D%3D&pageName=3476607d64293d401010"
        allowFullScreen
        style={styles.iframe}
      ></iframe>
    </div>
  );
};

const styles = {
  container: {
    width: '95%',
    maxWidth: '1200px',
    height: '90vh',
    margin: '0 auto',
    marginTop: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
};

export default PowerBIDashboard;
