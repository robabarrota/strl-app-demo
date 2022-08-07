import './styles.scss';

const Tooltip = ({ innerHtml, children }) => {

    return (
        <div className="tooltip">
            {children}
            <div className="tooltiptext">
                {innerHtml}
            </div>
        </div>
    );
}

export default Tooltip;
