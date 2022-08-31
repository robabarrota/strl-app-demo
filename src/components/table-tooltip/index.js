import './styles.scss';

const TableTooltip = ({ innerHtml, children }) => {

    return (
        <div className="table-tooltip">
            {children}
            <div className="table-tooltip__text">
                {innerHtml}
            </div>
        </div>
    );
}

export default TableTooltip;
