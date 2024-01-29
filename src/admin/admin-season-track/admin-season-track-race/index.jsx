import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import './styles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { getSeasonTrackRaceResults } from '@/redux/selectors';
import {
	fetchSeasonTrackRaceResults,
	updateSeasonTrackRaceResults,
} from '@/redux/actions';
import { useParams } from 'react-router-dom';
import DraggableItem from '@/components/draggable/draggable-item';
import DraggableArea from '@/components/draggable/draggable-area';
import { cb, sortPositions } from '@/utils/utils';
import { debounce } from 'lodash';
import useIsMobile from '@/hooks/useIsMobile';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useCheckUserPermission from '@/hooks/useCheckUserPermission';
import useIsActiveSeason from '@/hooks/useIsActiveSeason';

const blockName = 'admin-season-track-race';
const bem = cb(blockName);

const FlagButton = styled.button`
	&,
	&:focus,
	&:active {
		border-radius: 8px;
		padding: 3px 6px;
		font-weight: 400;
		margin: 0;
		letter-spacing: 0.8px;
		font-weight: 800;
		font-size: 15px;
		color: ${(props) => props.$color} !important;
		border: ${(props) => (props.$colorOutline ? props.$color : '#d0d0d0')} solid
			2px;

		${(props) =>
			props.$isActive &&
			`
				border-width: 3px !important;
				${props.$colorBorder && `box-shadow: 0px 0px 5px 3px ${props.$color};`}
		`}
	}
`;

const AdminSeasonTrackRace = ({ show }) => {
	const { seasonId, raceId } = useParams();
	const isMobile = useIsMobile();
	const dispatch = useDispatch();
	const [sortedLocalRace, setSortedLocalRace] = useState([]);

	const isActiveSeason = useIsActiveSeason(seasonId);

	const canEdit = useCheckUserPermission(
		isActiveSeason ? 'edit-season' : 'edit-history'
	);

	const { content: raceResults } = useSelectOrFetch(
		getSeasonTrackRaceResults,
		fetchSeasonTrackRaceResults,
		[seasonId, raceId]
	);

	const updateRaceResults = useCallback(
		debounce((sorted) => {
			let orderChanged = false;
			for (let i = 0; i < raceResults.length; i++) {
				orderChanged =
					sorted[i].seasonDriverId !== raceResults[i].seasonDriverId ||
					sorted[i].dnf !== raceResults[i].dnf ||
					sorted[i].dns !== raceResults[i].dns ||
					sorted[i].dsq !== raceResults[i].dsq ||
					sorted[i].fastestLap !== raceResults[i].fastestLap;
				if (orderChanged) break;
			}
			if (orderChanged) {
				dispatch(updateSeasonTrackRaceResults(seasonId, raceId, sorted));
			}
		}, 3000),
		[raceResults]
	);

	useEffect(() => {
		const orderedRaceResults = raceResults.sort(sortPositions);
		setSortedLocalRace(orderedRaceResults);
	}, [raceResults]);

	const updateRaceOrder = useCallback(
		(seasonDriverId, toPosition) => {
			const fromPosition = sortedLocalRace.find(
				(driverQual) => driverQual.seasonDriverId === seasonDriverId
			)?.position;
			if (fromPosition === toPosition) return;
			const newRaceOrder = sortedLocalRace
				.map((driverQual) => {
					let newPosition = driverQual.position;
					if (driverQual.seasonDriverId === seasonDriverId) {
						newPosition = toPosition;
					} else if (
						fromPosition < driverQual.position &&
						toPosition >= driverQual.position
					) {
						newPosition -= 1;
					} else if (
						driverQual.position >= toPosition &&
						driverQual.position < fromPosition
					) {
						newPosition += 1;
					}
					return {
						...driverQual,
						position: newPosition,
					};
				})
				.sort(sortPositions)
				.map((driverQual, index) => ({
					...driverQual,
					position: index + 1,
				}));

			setSortedLocalRace(newRaceOrder);

			if (newRaceOrder?.length) updateRaceResults(newRaceOrder);
		},
		[sortedLocalRace, setSortedLocalRace, updateRaceResults]
	);

	const toggleDriverFlag = useCallback(
		(seasonDriverId, toggledFlag) => {
			const flags = ['dns', 'dsq', 'dnf'];

			if (!flags.includes(toggledFlag)) return;

			const newRaceOrder = sortedLocalRace
				.map((driverQual) => {
					if (driverQual.seasonDriverId !== seasonDriverId) return driverQual;
					const newDriverQual = { ...driverQual };
					for (const flag of flags) {
						if (flag === toggledFlag) {
							newDriverQual[flag] = !newDriverQual[flag];
						} else {
							newDriverQual[flag] = false;
						}
					}
					newDriverQual.fastestLap = false;
					return newDriverQual;
				})
				.sort(sortPositions)
				.map((driverQual, index) => ({
					...driverQual,
					position: index + 1,
				}));

			setSortedLocalRace(newRaceOrder);

			if (newRaceOrder?.length) updateRaceResults(newRaceOrder);
		},
		[sortedLocalRace, setSortedLocalRace, updateRaceResults]
	);

	const toggleFastestLap = useCallback(
		(seasonDriverId) => {
			const newRaceData = sortedLocalRace.map((row) => ({
				...row,
				fastestLap:
					row.seasonDriverId === seasonDriverId &&
					!row.dnf &&
					!row.dns &&
					!row.dsq
						? !row.fastestLap
						: false,
			}));

			setSortedLocalRace(newRaceData);
			if (sortedLocalRace?.length) updateRaceResults(newRaceData);
		},
		[sortedLocalRace, setSortedLocalRace, updateRaceResults]
	);

	const getRowClass = (raceResult) => {
		if (raceResult.dns) return bem('dns');
		if (raceResult.dsq) return bem('dsq');
		if (raceResult.dnf) return bem('dnf');
		if (raceResult.fastestLap) return bem('fastest-lap');
		return '';
	};

	const getClassFlagMod = (raceResult, base, activeCheck) => {
		const classes = [bem(base)];
		if (raceResult.dns) {
			if (activeCheck === 'dns') classes.push(bem(base, 'active'));
			classes.push(bem(base, 'dns'));
		}
		if (raceResult.dsq) {
			if (activeCheck === 'dsq') classes.push(bem(base, 'active'));
			classes.push(bem(base, 'dsq'));
		}
		if (raceResult.dnf) {
			if (activeCheck === 'dnf') classes.push(bem(base, 'active'));
			classes.push(bem(base, 'dnf'));
		}
		return classes.join(' ');
	};

	const getButtonColor = (raceResult) => {
		if (raceResult.dsq || raceResult.dns || raceResult.dnf) return 'white';
		return 'black';
	};

	const renderTableBody = useCallback(
		(raceResult, index) => {
			if (canEdit) {
				return (
					<DraggableArea
						key={`${raceResult.seasonDriverId}-area`}
						accept="race"
						dropCallback={({ item }) => updateRaceOrder(item, index + 1)}
						Tag="tr"
						customClass={`${bem('label')} ${getRowClass(raceResult)}`}
					>
						<td className={getClassFlagMod(raceResult, 'label')}>
							{raceResult.position}
						</td>
						<DraggableItem
							key={`${raceResult.seasonDriverId}-item`}
							type="race"
							item={raceResult.seasonDriverId}
							Tag="td"
							customClass={getClassFlagMod(raceResult, 'label')}
						>
							{raceResult.firstName} {isMobile && <br />}
							{raceResult.lastName}
						</DraggableItem>
						<td>
							<div className={bem('button-container')}>
								<FlagButton
									$color={getButtonColor(raceResult)}
									$isActive={!!raceResult.dnf}
									$colorOutline={
										raceResult.dnf ||
										raceResult.dns ||
										raceResult.dsq ||
										raceResult.fastestLap
									}
									onClick={() =>
										toggleDriverFlag(raceResult.seasonDriverId, 'dnf')
									}
									$colorBorder={true}
								>
									<i className="fa-solid fa-person-circle-xmark"></i>
								</FlagButton>
							</div>
						</td>
						<td>
							<div className={bem('button-container')}>
								<FlagButton
									onClick={() =>
										toggleDriverFlag(raceResult.seasonDriverId, 'dsq')
									}
									$color={getButtonColor(raceResult)}
									$isActive={!!raceResult.dsq}
									$colorOutline={
										raceResult.dnf ||
										raceResult.dns ||
										raceResult.dsq ||
										raceResult.fastestLap
									}
									$colorBorder={true}
								>
									<i className="fa-solid fa-person-circle-minus"></i>
								</FlagButton>
							</div>
						</td>
						<td>
							<div className={bem('button-container')}>
								<FlagButton
									onClick={() =>
										toggleDriverFlag(raceResult.seasonDriverId, 'dns')
									}
									$color={getButtonColor(raceResult)}
									$isActive={!!raceResult.dns}
									$colorOutline={
										raceResult.dnf ||
										raceResult.dns ||
										raceResult.dsq ||
										raceResult.fastestLap
									}
									$colorBorder={true}
								>
									<i className="fa-solid fa-person-circle-question"></i>
								</FlagButton>
							</div>
						</td>
						<td>
							<div className={bem('button-container')}>
								<FlagButton
									onClick={() => toggleFastestLap(raceResult.seasonDriverId)}
									$color={getButtonColor(raceResult)}
									$isActive={!!raceResult.fastestLap}
									$colorOutline={
										raceResult.dnf ||
										raceResult.dns ||
										raceResult.dsq ||
										raceResult.fastestLap
									}
								>
									<i className="fa-solid fa-stopwatch"> </i>
								</FlagButton>
							</div>
						</td>
					</DraggableArea>
				);
			}

			return (
				<tr
					key={`${raceResult.seasonDriverId}-area`}
					accept="race"
					className={`${bem('label')} ${getRowClass(raceResult)}`}
				>
					<td className={getClassFlagMod(raceResult, 'label')}>
						{raceResult.position}
					</td>
					<td
						key={`${raceResult.seasonDriverId}-item`}
						type="race"
						className={getClassFlagMod(raceResult, 'label')}
					>
						{raceResult.firstName} {isMobile && <br />}
						{raceResult.lastName}
					</td>
					<td>
						<div className={bem('flag-check')}>
							{raceResult.dnf ? (
								<i className="fa-solid fa-person-circle-xmark"></i>
							) : null}
						</div>
					</td>
					<td>
						<div className={bem('flag-check')}>
							{raceResult.dsq ? (
								<i className="fa-solid fa-person-circle-minus"></i>
							) : null}
						</div>
					</td>
					<td>
						<div className={bem('flag-check')}>
							{raceResult.dns ? (
								<i className="fa-solid fa-person-circle-question"></i>
							) : null}
						</div>
					</td>
					<td>
						<div className={bem('flag-check')}>
							{raceResult.fastestLap ? (
								<i className="fa-solid fa-stopwatch"> </i>
							) : null}
						</div>
					</td>
				</tr>
			);
		},
		[updateRaceOrder]
	);

	if (!show) return null;
	return (
		<div className={blockName}>
			<table>
				<thead>
					<tr>
						<th className={bem('header')}>Position</th>
						<th className={bem('header')}>Driver</th>
						<th>DNF</th>
						<th>DSQ</th>
						<th>DNS</th>
						<th>Fastest</th>
					</tr>
				</thead>
				<tbody>
					{sortedLocalRace.map((raceResult, index) =>
						renderTableBody(raceResult, index)
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminSeasonTrackRace;
