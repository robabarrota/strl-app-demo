import { useState } from 'react';
import './styles.scss';

const TableTooltip = ({ innerHtml, children, hangLeft = false, customClass = '' }) => {
    const [visible, setVisible] = useState(false)
    const hangClass = hangLeft ? "table-tooltip__hang-left" : '';
    return (
        <button 
            className={`table-tooltip ${customClass}`} 
            onClick={() => setVisible(visibility => !visibility)} 
            onBlur={() => setVisible(false)}
        >
            {children}
            {visible && 
                <div className={`table-tooltip__text ${hangClass}`}>
                    {innerHtml}
                </div>
            }
            
        </button>
    );
}

export default TableTooltip;
