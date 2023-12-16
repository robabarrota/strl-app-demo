import './styles.scss';
import { cb } from '@/utils/utils';
import { carAbbreviationMap } from '@/utils/constants';

const blockName = 'constructor-badge';
const bem = cb(blockName);

const ConstructorBadge = ({ constructor }) => {

    const abbreviation = carAbbreviationMap[constructor];
    const abbrevClass = bem(abbreviation?.toLowerCase());

    return (
        <div className={`${blockName} ${abbrevClass}`}>
            {abbreviation}
        </div>
    );
}

export default ConstructorBadge;
