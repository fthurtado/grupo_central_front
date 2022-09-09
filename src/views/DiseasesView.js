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
  const [showFavs, setShowFavs] = useState(false);
  const [searchText, setSearchText] = useState('');

  const updateFavoriteState = (name) => {
    const diseasesCopy = { ...diseases };
    diseasesCopy[name].favorite = !diseases[name].favorite;
    setDiseases(diseasesCopy);
  }
  
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
            <div
              className={`option ${(!showFavs) && 'selected'}`}
              onClick={() => setShowFavs(false)}
            >
              Enfermedad
            </div>
            <div
              className={`option ${(showFavs) && 'selected'}`}
              onClick={() => setShowFavs(true)}
            >
              Favoritos
            </div>
          </div>
          <div className="diseases">
            <input
              type="text"
              className="search-bar"
              placeholder="Nombre enfermedad..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            {Object.keys(diseases)
            .filter((name) => (showFavs) ? diseases[name].favorite : true)
            .filter((name) => (searchText.length > 0)
              ? name.toLowerCase().includes(searchText)
              : true)
            .map((name, i) => (
              <div
                key={i}
                className="disease-container"
              >
                <p>
                  {name}
                </p>
                {(diseases[name].favorite) ? (
                  <AiFillHeart onClick={() => updateFavoriteState(name)} />
                  ) : (
                  <AiOutlineHeart onClick={() => updateFavoriteState(name)} />
                )}
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
