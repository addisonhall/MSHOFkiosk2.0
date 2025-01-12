import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import FinalistsComponent from './FinalistsComponent';
import { ReactComponent as MSHFWhiteLogo } from './sports_hall_logo_white.svg';
import { config } from '../../components/Constants';
const URL = config.url



const YearWinnerPage = () => {
  const { awardId, yearId } = useParams();
  const [yearData, setYearData] = useState();

  const [awardData, setAwardData] = useState();
  const [winner, setWinner] = useState();
  const [showFinalists, setShowFinalists] = useState(false);
  const navigate = useNavigate();
  const [athletesForAward, setAthletesForAward] = useState();

  useEffect(() => {
    fetch(`${URL}/api/years/${yearId}?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setYearData(data);
        const specificAward = data.data.attributes.awards.data.find(
          award => award.id === parseInt(awardId)
        );
        console.log(specificAward);
        setAwardData(specificAward);
        const athletesForAward = data.data.attributes.athletes.data.filter(
          athlete => athlete.attributes.finalist === true && athlete.attributes.sport === specificAward.attributes.sport
        );
        console.log(athletesForAward);
        setAthletesForAward(athletesForAward);
        const winnerForAward = data.data.attributes.athletes.data.filter(
          athlete => athlete.attributes.finalist === false && athlete.attributes.sport === specificAward.attributes.sport
        );
        console.log(winnerForAward[0]);

        setWinner(winnerForAward[0]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [awardId, yearId]);
  console.log(URL);

  return (
    <div className="container-fluid bg-dark yearWinnerImage" style={{ backgroundImage: `url(${winner?.attributes.imageLink})` }}>
      <MSHFWhiteLogo className="img-fluid position-absolute top-0 end-0 whiteLogo" />
      <div className="row justify-content-between">
        <div className="col-md-4">
          <div className="card text-white yearWinnerBanner">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h1 className="yearBannerText athleticFont pt-3">{awardData?.attributes.name}</h1>
                <div>
                  <p className="card-text d-inline yearBannerYear">WINNER {yearData?.data.attributes.awardYear}</p>
                  <img className='text-uppercase bannerIcon d-inline' src={awardData?.attributes?.iconLink} alt="icon" />
                </div>
              </div>
              <img src={awardData?.attributes?.sponsorLogoLink} alt="sponsor-logo" className="my-4 img-fluid sponsorLogo" style={{ maxWidth: 'fit-content' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="col-md-4 text-white text-uppercase justify-content-center align-items-center winnerInfo">
          <img src={winner?.attributes.schoolLogoLink} alt="school-logo" className="my-4 img-fluid text-center schoolLogo" />
          {winner &&
            <div>
              <h3 className="yearWinnerText athleticFont text-center">{winner.attributes.firstName} {winner.attributes.lastName}</h3>
              <p className="text-start yearWinnerSubText text-center">{winner.attributes.positionFullName}</p>
            </div>
          }
        </div>
        <div className="col-md-4 text-white text-uppercase text-center buttonContainerWinner athleticFont">
          <button className="btn w-75 mb-2 btnStyle winnerButton" onClick={() => navigate(`/profile/${winner.id}`, { state: { awardId, yearId } })}>Profile</button>

          <button className="btn w-75 mb-2 btnStyle yellowBtn" onClick={() => setShowFinalists(true)}>Finalists</button>
          <button className="btn w-75 mb-2 btnStyle yellowBtn1" onClick={() => { showFinalists ? setShowFinalists(false) : navigate(`/awards/${awardId}`) }}>
            Back
          </button>
          <Link to="/" className="btn w-75 mb-2 btnStyle yellowBtn1" >start over</Link>
        </div>
      </div>

      {showFinalists && <FinalistsComponent finalists={athletesForAward} awardId={awardId} yearId={yearId} onClose={() => setShowFinalists(false)} />}
    </div>
  );
};

export default YearWinnerPage;
