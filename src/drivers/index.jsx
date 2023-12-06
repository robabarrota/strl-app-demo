import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getArchives, getDriverStats, getDriversPageData, getParticipants } from '@/redux/selectors';
import { useMemo } from 'react';
import { trackDetails } from '@/utils/constants';
import { getDriverImage } from '@/utils/utils';
import { fetchArchives, fetchDriverStats, fetchParticipants } from '@/redux/actions';

import styled from 'styled-components';

const HeaderContainer = styled.fieldset`
	display: flex;
	justify-content: space-between;
`;

const DriverCard = styled.fieldset`
	border-top: solid 2px #000;
	border-right: solid 2px #000;
	border-top-right-radius: 10px;
	padding-top: 0;
	padding-top: 0;
	margin-top: 40px;
	padding-right: 10px;
	transition: .1s all ease;

	&:hover, &:focus, &:active {
		padding-top: 10px;
		margin-top: 30px;
		border-color: ${props => props.color};
	}
`;

const CountryFlag = styled.div`
	width: 48px;
	border: 1px solid #949498;
	overflow: hidden;
	border-radius: 5px;
	position: relative;
	top: -2px;

	> img {
		width: 100%;
		height: auto;
		display: block;
	}
`;

const DriverNumber = styled.div`
	font-family: 'strl-font';
	font-size: 54px;
	line-height: normal;
	font-weight: 900;
	color: ${props => props.color};
`;

const DriverImage = styled.img`
	display: inline-block;
	height: 100%;
	width: auto;
	background: linear-gradient(#fff, 80%, ${props => props.color});
    padding: 2px;
    border-radius: 5px;
`;

const Drivers = () => {
	const dispatch = useDispatch();

	const { content: archives, loading: archivesLoading, error: archivesError, fetched: archivesFetched } = useSelector(getArchives);
	const { loading: driverStatsLoading, fetched: driverStatsFetched, error: driverStatsError } = useSelector(getDriverStats);
	const { loading: participantsLoading, fetched: participantsFetched, error: participantsError } = useSelector(getParticipants);
	
	if (!archivesFetched && !archivesLoading && !archivesError) dispatch(fetchArchives());
	if (!driverStatsFetched && !driverStatsLoading && !driverStatsError) dispatch(fetchDriverStats());
	if (!participantsFetched && !participantsLoading && !participantsError) dispatch(fetchParticipants());
	
	const isDataReady = useMemo(() => archivesFetched && !archivesLoading, [archivesFetched, archivesLoading]);
	
	const driverData = useSelector(getDriversPageData);

	const seasonNumber = useMemo(() => archives.length, [archives]);

	if (isDataReady) {
		return (
			<div className="drivers">
				<HeaderContainer>
					<h1 className="drivers__title">STRL Drivers Season {seasonNumber}</h1>
				</HeaderContainer>

				<div className="drivers__card-container">
					{driverData.map((driver, index) => {
						return (
							<DriverCard color={driver.numberColour} key={`driver-${index + 1}`}>
								<div className="drivers__standings-info">
									<div className="drivers__top-bar">
										<p className="drivers__rank">{index + 1}</p>
										<div className="drivers__points-container">
											<p className="drivers__points">{driver.total}</p>
											<p className="drivers__points-label">PTS</p>
										</div>
									</div>
								</div>
								<div className="drivers__driver-description">
									<div className="drivers__driver-description--name-container">
										<div className="drivers__driver-description--first-name">
											{driver.firstName}
										</div>
										<div className="drivers__driver-description--last-name">
											{driver.lastName || ' '}
										</div>
									</div>
									<CountryFlag>
										<img src={trackDetails[driver.country]?.flag || trackDetails['Canada']?.flag} alt={`${driver.country} flag`} />
									</CountryFlag>
								</div>

								<div className="drivers__card-bottom">
									<span className='drivers__team-label'>{driver.car}</span>
									<div className="drivers__image-container">
										<DriverNumber color={driver.numberColour}>{driver.number || 0}</DriverNumber>
										<DriverImage color={driver.numberColour} src={getDriverImage(driver.driver)} alt={driver.driver} />
									</div>
								</div>
							</DriverCard>
						)
					})}
				</div>
			</div>
		);
	}
}

export default Drivers;
