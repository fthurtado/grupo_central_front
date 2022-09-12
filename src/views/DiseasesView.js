import React, {
  useEffect,
  useState,
} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';

// Styles
import '../styles/DiseasesStyles.scss';

// Helpers
import numberFormat from '../helpers/numberFormat';
import loadData from '../helpers/loadData';

// Constants
import months from '../constants/months';

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
  const [diseaseSelected, setDiseaseSelected] = useState('');
  const [year, setYear] = useState('2014');
  const [chartData, setChartData] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const updateFavoriteState = (name) => {
    const diseasesCopy = { ...diseases };
    diseasesCopy[name].favorite = !diseases[name].favorite;
    setDiseases(diseasesCopy);
  }
  
  // Load data first then return the view
  useEffect(() => {
    loadData()
      .then((data) => {
        setDiseases(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (diseaseSelected.length > 0) {
      setChartData(Object.keys(diseases[diseaseSelected][year]).map((month) => {
        return { name: months[month], value: diseases[diseaseSelected][year][month] }
      }));
      setShowInfo(true);
    } else setShowInfo(false);
  }, [diseases, diseaseSelected, year])

  useEffect(() => console.log(chartData), [chartData])

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
              className={`option ${(showFavs) && 'selected'} none-border-right`}
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
            // filter if favorites section is active
            .filter((name) => (showFavs) ? diseases[name].favorite : true)
            // filter if search bar is active
            .filter((name) => (searchText.length > 0) ?
              name.toLowerCase().includes(searchText.toLowerCase())
              : true)
            .map((name, i) => (
              <div
                key={i}
                className="disease-container"
              >
                <p onClick={() => setDiseaseSelected(name)}>
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
        {(showInfo) && (
          <div className="right-container">
            <div className="disease-name">
              <p>
                {diseaseSelected}
              </p>
              {(diseases[diseaseSelected].favorite) ? (
                <AiFillHeart onClick={() => updateFavoriteState(diseaseSelected)} />
                ) : (
                <AiOutlineHeart onClick={() => updateFavoriteState(diseaseSelected)} />
              )}
            </div>
            <select
              name="years"
              id="years"
              onChange={(e) => setYear(e.target.value)}
            >
              {Object.keys(diseases[diseaseSelected])
              .filter((value) => value !== "favorite")
              .map((year) => (
                <option
                  value={year}
                  key={year}
                >
                  {year}
                </option>
              ))}
            </select>
            <div className="graph">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart width="100%" height={300} data={chartData} barSize={20} barCategoryGap={2}>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={numberFormat} />
                  <Bar dataKey="value" />
                </BarChart>

              </ResponsiveContainer>
            </div>
            <table>
              <thead>
                <tr>
                  {Object.values(months).map((month, i) => (
                    <th
                      key={i}
                      className="header"
                    >
                      {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(diseases[diseaseSelected][year]).map((quantity, i) => (
                    <td
                      key={i}
                      className="cell"
                    >
                      {numberFormat(quantity)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diseases;
