import './styles.scss';
import constants from '../../utils/constants';

const ConstructorBadge = ({ constructor }) => {

    const abbreviation = constants.carAbbreviationMap[constructor];
    const abbrevClass = `constructor-badge__${abbreviation?.toLowerCase()}`;

    return (
        <div className={`constructor-badge ${abbrevClass}`}>
            {abbreviation}
        </div>
    );
}

export default ConstructorBadge;
