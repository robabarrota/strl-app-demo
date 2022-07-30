import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQualifying } from 'src/redux/selectors';
import { fetchQualifying } from 'src/redux/actions';
import { isEmpty } from 'lodash';

const Qualifying = () => {
	const dispatch = useDispatch();
	const {content: qualifying} = useSelector(getQualifying);

	if(isEmpty(qualifying)) dispatch(fetchQualifying());

	if (qualifying) {
		return (
			<div>
				<table>
					<thead>
						<tr>
							{Object.keys(qualifying[0]).map((col) => (
								<th>{col}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{qualifying.map((row) => (
							<tr>
								{Object.values(row).map((value) => (
									<td>{value}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Qualifying;
