import React, { useMemo } from 'react';
import './styles.scss';
import { cb } from '@/utils/utils';

import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import { getSeasons } from '@/redux/selectors';
import { fetchSeasons } from '@/redux/actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const blockName = 'admin-seasons';
const bem = cb(blockName);

const SeasonCard = styled(Link)`
	border-top: solid 2px #000;
	border-right: solid 2px #000;
	border-top-right-radius: 10px;
	padding-top: 0;
	padding-top: 0;
	margin-top: 40px;
	padding-right: 10px;
	transition: 0.1s all ease;
	border-color: ${(props) => props.$color};

	&:hover,
	&:focus,
	&:active {
		padding-top: 10px;
		margin-top: 30px;
	}
`;

const DriverNameContainer = styled.div`
	padding-left: 15px;
	text-transform: uppercase;
	position: relative;
	&::before {
		background-color: ${(props) => props.$color || '#949498'};
		bottom: 5px;
		content: '';
		display: block;
		left: 0;
		position: absolute;
		top: 2px;
		width: 5px;
	}
`;

const ConstructorNameContainer = styled.div`
	padding-left: 15px;
	text-transform: uppercase;
	position: relative;
	height: 39px;
	&::before {
		background-color: ${(props) => props.$color || '#949498'};
		bottom: 5px;
		content: '';
		display: block;
		left: 0;
		position: absolute;
		top: 2px;
		width: 5px;
	}
`;

const IconContainer = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20px;
	gap: 4px;
`;

const AdminSeasons = () => {
	const { content: seasons } = useSelectOrFetch(getSeasons, fetchSeasons);

	const sortedSeasons = useMemo(
		() => seasons.sort((a, b) => b.number - a.number),
		[seasons]
	);
	return (
		<div className={blockName}>
			<h1 className={bem('title')}>Seasons</h1>

			<div className={bem('card-container')}>
				{sortedSeasons.map((season) => (
					<SeasonCard
						$color={season.isActive ? '#e10600' : '#000'}
						key={season.id}
						to={`/admin/season/${season.id}`}
					>
						<div className={bem('season-title')}>Season {season.number}</div>
						<div className={bem('driver-description')}>
							<IconContainer>
								<i className={`fa-solid fa-medal ${bem('trophy-icon')}`} />
								<img
									className={bem('icon')}
									src="/strl-app/driver-icon.png"
									alt={'icon'}
								/>
							</IconContainer>
							<DriverNameContainer $color={season.driverChampion?.color}>
								<div className={bem('driver-description', 'first-name')}>
									{season.driverChampion?.firstName || 'TBD'}
								</div>
								<div className={bem('driver-description', 'last-name')}>
									{season.driverChampion?.lastName || 'TBD'}
								</div>
							</DriverNameContainer>
						</div>
						<div className={bem('constructor-description')}>
							<IconContainer>
								<i className={`fa-solid fa-medal ${bem('trophy-icon')}`} />
								<img
									className={bem('icon')}
									src="/strl-app/constructor-icon.png"
									alt={'icon'}
								/>
							</IconContainer>
							<ConstructorNameContainer
								$color={season.constructorChampion?.color}
							>
								<div className={bem('constructor-description', 'name')}>
									{season.constructorChampion?.name || 'TBD'}
								</div>
							</ConstructorNameContainer>
						</div>
					</SeasonCard>
				))}
			</div>
		</div>
	);
};

export default AdminSeasons;
