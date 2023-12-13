import './styles.scss';
import styled from 'styled-components';

const Glider = styled.span`
    position: absolute;
    display: flex;
    height: ${props => props.useIcons ? '24px' : '20px'};
    width: ${props => props.useIcons ? '60px' : '100px'};
    background-color: #e10600;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
    
    transform: translateX(${({index}) => (index || 0) * 100}%);
`;

const TabLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${props => props.useIcons ? '24px' : '20px'};
    width: ${props => props.useIcons ? '60px' : '100px'};
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 99px; // just a high number to create pill effect
    cursor: pointer;
    transition: color 0.15s ease-in, color 0.15s ease-out;
    text-transform: uppercase;
    ${props => props.useIcons && 'padding: 2px'};

    
    ${({selected}) => selected ? 'color: #fff;' : ''};
`;

const Tabs = ({ tabs, activeTabIndex, onChange, useIcons }) => {
    return (
        <div className="tabs">
            <div className="tabs__container">
                <Glider index={activeTabIndex} useIcons={useIcons} />
                {tabs.map((content, index) => (
                    <div key={content}>
                        <input 
                            key={`input-${index}`} 
                            type="radio" 
                            id={`radio-${index}`}
                            name="tabs" 
                            onChange={() => onChange(index)} 
                            checked={index === activeTabIndex}
                        />
                        {
                            useIcons ? (
                                <TabLabel
                                    key={`label-${index}`} 
                                    htmlFor={`radio-${index}`}
                                    selected={index === activeTabIndex}
                                    useIcons={useIcons}
                                >
                                    <img className='tabs__icon' src={content} alt={'icon'}/>
                                </TabLabel>
                                
                            ) : 
                            (
                                <TabLabel
                                    key={`label-${index}`} 
                                    htmlFor={`radio-${index}`}
                                    selected={index === activeTabIndex}
                                >
                                    {content}
                                </TabLabel>
                            )
                        }
                       
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tabs;
