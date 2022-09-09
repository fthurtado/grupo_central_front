import React, {
  useEffect,
  useState,
} from 'react';

// Styles
import '../styles/DiseasesStyles.scss';

// Helpers
import loaddata from '../helpers/loaddata';

// Icons
import {
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";

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
    <div className="diseases-container">
      <p className="title">
        Visor Causas de muerte EEUU
      </p>
      <div className="info-container">
        <div className="left-container">
          <div className="options">
            <div className="option">
              Enfermedad
            </div>
            <div className="option">
              Favoritos
            </div>
          </div>
          <div className="diseases">
            <input type="text" className="search-bar" placeholder="Nombre enfermedad..." />
            {Object.keys(diseases).map((name) => (
              <div className="disease-container">
                <p>
                  {name}
                </p>
                <AiOutlineHeart />
              </div>
            ))}
          </div>
        </div>
        <div className="right-container">
          right content
        </div>
      </div>
    </div>
  );
}

export default Diseases;
