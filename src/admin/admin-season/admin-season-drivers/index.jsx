import './styles.scss';
import React, { useCallback, useMemo } from 'react';
import { cb } from '@/utils/utils';
import { useParams } from 'react-router-dom';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import {
	getConstructors,
	getDrivers,
	getSeasonDrivers,
} from '@/redux/selectors';
import {
	createSeasonDriver,
	deleteSeasonDriver,
	fetchConstructors,
	fetchDrivers,
	fetchSeasonDrivers,
	updateSeasonDriver,
} from '@/redux/actions';
import DropdownSelect from '@/components/dropdown-select';
import useCheckUserPermission from '@/hooks/useCheckUserPermission';
import { useDispatch } from 'react-redux';
import Loader from '@/components/loader';

const blockName = 'admin-season-drivers';
const bem = cb(blockName);

const AdminSeasonDrivers = ({ show }) => {
	const dispatch = useDispatch();
	const { seasonId } = useParams();
	const { content: seasonDrivers } = useSelectOrFetch(
		getSeasonDrivers,
		fetchSeasonDrivers,
		[seasonId]
	);
	const { content: drivers, loading: driversLoading } = useSelectOrFetch(
		getDrivers,
		fetchDrivers
	);
	const { content: constructors, loading: constructorsLoading } =
		useSelectOrFetch(getConstructors, fetchConstructors);
	const { content: seasons, loading: seasonsLoading } = useSelectOrFetch(
		getConstructors,
		fetchConstructors
	);

	const isActiveSeason = useMemo(
		() => seasons?.find(({ id }) => id === +seasonId)?.isActive || false,
		[seasons, seasonId]
	);

	const canEdit = useCheckUserPermission(
		isActiveSeason ? 'edit-season' : 'edit-history'
	);

	const driverOptions = useMemo(
		() =>
			drivers.map((driver) => ({
				value: driver.id,
				label: `${driver.firstName} ${driver.lastName}`,
			})),
		[drivers]
	);
	const constructorOptions = useMemo(
		() =>
			constructors.map((constructor) => ({
				value: constructor.id,
				label: constructor.name,
			})),
		[constructors]
	);

	const addSeasonDriver = useCallback(
		() => dispatch(createSeasonDriver(seasonId)),
		[dispatch, seasonId]
	);
	const removeSeasonDriver = useCallback(
		(seasonDriverId) => dispatch(deleteSeasonDriver(seasonId, seasonDriverId)),
		[dispatch, seasonId]
	);
	const changeSeasonDriver = useCallback(
		(seasonDriverId, updateBody) =>
			dispatch(updateSeasonDriver(seasonId, seasonDriverId, updateBody)),
		[dispatch, seasonId]
	);

	const renderRowElements = useMemo(
		() =>
			canEdit ? (
				<>
					{seasonDrivers.map((seasonDriver) => (
						<tr className={bem('driver-container')} key={seasonDriver.id}>
							<td>
								<DropdownSelect
									isLoading={driversLoading}
									options={driverOptions}
									value={seasonDriver.driver.id}
									onChange={({ value }) =>
										changeSeasonDriver(seasonDriver.id, { driverId: value })
									}
									required
									className={bem('input-dropdown')}
								/>
							</td>
							<td>
								<DropdownSelect
									isLoading={constructorsLoading}
									options={constructorOptions}
									value={seasonDriver.constructor.id}
									onChange={({ value }) =>
										changeSeasonDriver(seasonDriver.id, {
											constructorId: value,
										})
									}
									required
									className={bem('input-dropdown')}
								/>
							</td>
							<td>
								<input
									className={bem('primary-check')}
									type="checkbox"
									checked={seasonDriver.isPrimaryDriver}
									onChange={() =>
										changeSeasonDriver(seasonDriver.id, {
											isPrimaryDriver: !seasonDriver.isPrimaryDriver,
										})
									}
								/>
							</td>
							<td>
								<button
									className={bem('delete-button')}
									onClick={() => removeSeasonDriver(seasonDriver.id)}
								>
									<i className="fa-solid fa-xmark"></i>
								</button>
							</td>
						</tr>
					))}
					<tr className={bem('driver-container')}>
						<td>
							<button className={bem('add-button')} onClick={addSeasonDriver}>
								<i className="fa-solid fa-plus"></i>
							</button>
						</td>
					</tr>
				</>
			) : (
				seasonDrivers.map((seasonDriver) => (
					<tr className={bem('driver-container')} key={seasonDriver.id}>
						<td>
							<div className={bem('label')}>
								{seasonDriver.driver.firstName} {seasonDriver.driver.lastName}
							</div>
						</td>
						<td>
							<div className={bem('label')}>
								{seasonDriver.constructor.name}
							</div>
						</td>
						<td>
							<div className={bem('label')}>
								{seasonDriver.isPrimaryDriver && (
									<i className="fa-solid fa-check"></i>
								)}
							</div>
						</td>
					</tr>
				))
			),
		[
			seasonDrivers,
			canEdit,
			driversLoading,
			driverOptions,
			constructorsLoading,
			constructorOptions,
			addSeasonDriver,
			removeSeasonDriver,
			changeSeasonDriver,
		]
	);

	if (!show) return null;

	if (driversLoading || constructorsLoading || seasonsLoading) {
		return <Loader />;
	}

	return (
		<div className={blockName}>
			{
				<table>
					<thead>
						<tr>
							<th className={bem('header')}>Driver</th>
							<th className={bem('header')}>Constructor</th>
							<th className={bem('header')}>Primary Driver</th>
							{canEdit && <th></th>}
						</tr>
					</thead>
					<tbody>{renderRowElements}</tbody>
				</table>
			}
		</div>
	);
};

export default AdminSeasonDrivers;
