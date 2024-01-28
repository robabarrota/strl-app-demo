import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import './styles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { getSeasonTrackQualifyingResults } from '@/redux/selectors';
import {
	fetchSeasonTrackQualifyingResults,
	updateSeasonTrackQualifyingResults,
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

const blockName = 'admin-season-track-qualifying';
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
		border: ${(props) => (props.$outOfRace ? props.$color : '#d0d0d0')} solid
			2px;

		${(props) =>
			props.$isActive &&
			`
				border-width: 3px !important;
				box-shadow: 0px 0px 5px 3px ${props.$color};
		`}
	}
`;

const AdminSeasonTrackQualifying = ({ show }) => {
	const { seasonId, raceId } = useParams();
	const isMobile = useIsMobile();
	const dispatch = useDispatch();
	const [sortedLocalQualifying, setSortedLocalQualifying] = useState([]);

	const isActiveSeason = useIsActiveSeason(seasonId);

	const canEdit = useCheckUserPermission(
		isActiveSeason ? 'edit-season' : 'edit-history'
	);

	const { content: qualifyingResults } = useSelectOrFetch(
		getSeasonTrackQualifyingResults,
		fetchSeasonTrackQualifyingResults,
		[seasonId, raceId]
	);

	const updateQualifyingResults = useCallback(
		debounce((sorted) => {
			let orderChanged = false;
			for (let i = 0; i < qualifyingResults.length; i++) {
				orderChanged =
					sorted[i].seasonDriverId !== qualifyingResults[i].seasonDriverId ||
					sorted[i].dnf !== qualifyingResults[i].dnf ||
					sorted[i].dns !== qualifyingResults[i].dns ||
					sorted[i].dsq !== qualifyingResults[i].dsq;
				if (orderChanged) break;
			}
			if (orderChanged) {
				dispatch(updateSeasonTrackQualifyingResults(seasonId, raceId, sorted));
			}
		}, 3000),
		[qualifyingResults]
	);

	useEffect(() => {
		const orderedQualifyingResults = qualifyingResults.sort(sortPositions);
		setSortedLocalQualifying(orderedQualifyingResults);
	}, [qualifyingResults]);

	const updateQualifyingOrder = useCallback(
		(seasonDriverId, toPosition) => {
			const fromPosition = sortedLocalQualifying.find(
				(driverQual) => driverQual.seasonDriverId === seasonDriverId
			)?.position;
			if (fromPosition === toPosition) return;
			const newQualifyingOrder = sortedLocalQualifying
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

			setSortedLocalQualifying(newQualifyingOrder);

			if (sortedLocalQualifying?.length)
				updateQualifyingResults(newQualifyingOrder);
		},
		[sortedLocalQualifying, setSortedLocalQualifying, updateQualifyingResults]
	);

	const toggleDriverFlag = useCallback(
		(seasonDriverId, toggledFlag) => {
			const flags = ['dns', 'dsq', 'dnf'];

			if (!flags.includes(toggledFlag)) return;

			const newQualifyingOrder = sortedLocalQualifying
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
					return newDriverQual;
				})
				.sort(sortPositions)
				.map((driverQual, index) => ({
					...driverQual,
					position: index + 1,
				}));

			setSortedLocalQualifying(newQualifyingOrder);

			if (sortedLocalQualifying?.length)
				updateQualifyingResults(newQualifyingOrder);
		},
		[sortedLocalQualifying, setSortedLocalQualifying, updateQualifyingResults]
	);

	const getRowClass = (qualifyingResult) => {
		if (qualifyingResult.dns) return bem('dns');
		if (qualifyingResult.dsq) return bem('dsq');
		if (qualifyingResult.dnf) return bem('dnf');
		return '';
	};

	const getClassFlagMod = (qualifyingResult, base, activeCheck) => {
		const classes = [bem(base)];
		if (qualifyingResult.dns) {
			if (activeCheck === 'dns') classes.push(bem(base, 'active'));
			classes.push(bem(base, 'dns'));
		}
		if (qualifyingResult.dsq) {
			if (activeCheck === 'dsq') classes.push(bem(base, 'active'));
			classes.push(bem(base, 'dsq'));
		}
		if (qualifyingResult.dnf) {
			if (activeCheck === 'dnf') classes.push(bem(base, 'active'));
			classes.push(bem(base, 'dnf'));
		}
		return classes.join(' ');
	};

	const getButtonColor = (qualifyingResult) => {
		if (qualifyingResult.dsq || qualifyingResult.dns || qualifyingResult.dnf)
			return 'white';
		return 'black';
	};

	const renderTableBody = useCallback(
		(qualifyingResult, index) => {
			if (canEdit) {
				return (
					<DraggableArea
						key={`${qualifyingResult.seasonDriverId}-area`}
						accept="qualifying"
						dropCallback={({ item }) => updateQualifyingOrder(item, index + 1)}
						Tag="tr"
						customClass={`${bem('label')} ${getRowClass(qualifyingResult)}`}
					>
						<td className={getClassFlagMod(qualifyingResult, 'label')}>
							{qualifyingResult.position}
						</td>
						<DraggableItem
							key={`${qualifyingResult.seasonDriverId}-item`}
							type="qualifying"
							item={qualifyingResult.seasonDriverId}
							Tag="td"
							customClass={getClassFlagMod(qualifyingResult, 'label')}
						>
							{qualifyingResult.firstName} {isMobile && <br />}
							{qualifyingResult.lastName}
						</DraggableItem>
						<td>
							<div className={bem('button-container')}>
								<FlagButton
									$color={getButtonColor(qualifyingResult)}
									$isActive={!!qualifyingResult.dnf}
									$outOfRace={
										qualifyingResult.dnf ||
										qualifyingResult.dns ||
										qualifyingResult.dsq
									}
									onClick={() =>
										toggleDriverFlag(qualifyingResult.seasonDriverId, 'dnf')
									}
								>
									DNF
								</FlagButton>
							</div>
						</td>
						<td>
							<div className={bem('button-container')}>
								<FlagButton
									onClick={() =>
										toggleDriverFlag(qualifyingResult.seasonDriverId, 'dsq')
									}
									$color={getButtonColor(qualifyingResult)}
									$isActive={!!qualifyingResult.dsq}
									$outOfRace={
										qualifyingResult.dnf ||
										qualifyingResult.dns ||
										qualifyingResult.dsq
									}
								>
									DSQ
								</FlagButton>
							</div>
						</td>
						<td>
							<div className={bem('button-container')}>
								<FlagButton
									onClick={() =>
										toggleDriverFlag(qualifyingResult.seasonDriverId, 'dns')
									}
									$color={getButtonColor(qualifyingResult)}
									$isActive={!!qualifyingResult.dns}
									$outOfRace={
										qualifyingResult.dnf ||
										qualifyingResult.dns ||
										qualifyingResult.dsq
									}
								>
									DNS
								</FlagButton>
							</div>
						</td>
					</DraggableArea>
				);
			}

			return (
				<tr
					key={`${qualifyingResult.seasonDriverId}-area`}
					accept="qualifying"
					className={`${bem('label')} ${getRowClass(qualifyingResult)}`}
				>
					<td className={getClassFlagMod(qualifyingResult, 'label')}>
						{qualifyingResult.position}
					</td>
					<td
						key={`${qualifyingResult.seasonDriverId}-item`}
						type="qualifying"
						className={getClassFlagMod(qualifyingResult, 'label')}
					>
						{qualifyingResult.firstName} {isMobile && <br />}
						{qualifyingResult.lastName}
					</td>
					<td>
						<div className={bem('flag-check')}>
							{qualifyingResult.dnf ? 'DNF' : null}
						</div>
					</td>
					<td>
						<div className={bem('flag-check')}>
							{qualifyingResult.dsq ? 'DSQ' : null}
						</div>
					</td>
					<td>
						<div className={bem('flag-check')}>
							{qualifyingResult.dns ? 'DNS' : null}
						</div>
					</td>
				</tr>
			);
		},
		[updateQualifyingOrder]
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
					</tr>
				</thead>
				<tbody>
					{sortedLocalQualifying.map((qualifyingResult, index) =>
						renderTableBody(qualifyingResult, index)
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminSeasonTrackQualifying;
