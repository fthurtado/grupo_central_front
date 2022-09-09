import React, { useEffect, useState } from 'react';

// Styles
import '../styles/DiseasesStyles.scss';

// Helpers
import loaddata from '../helpers/loaddata';

function Diseases() {

  // States
  const [diseases, setDiseases] = useState({});

  // Load data first then return the view
  useEffect(() => {
    loaddata()
      .then((data) => {
        setDiseases(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (Object.keys(diseases).length > 0) && (
    <>Hello World!</>
  );
}

export default Diseases;
