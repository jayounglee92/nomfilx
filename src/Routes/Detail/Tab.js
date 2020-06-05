import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const STabs = styled(Tabs)`
    width: 50%;
    margin-top:20px;
`;

const STabList = styled(TabList)`
    display: flex;
    width: 100%;
`;
STabList.tabsRole = 'TabList';

const STab = styled(Tab)`
    height: 34px;
    padding: 10px 15px;
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
    transition: border-bottom 0.1s linear;
    box-sizing: border-box;

    &.is-selected {
    background-color: rgba(255,255,255,0.4);
    border-bottom: 2px solid white;
  }

    &:focus {
        background-color: rgba(255,255,255,0.4);
    }
`;
STab.tabsRole = 'Tab';

const STabPanel = styled(TabPanel)`
    display: none;
    padding: 20px 10px;
    background-color: rgba(255,255,255,0.4);

    &.is-selected {
        display: block;
    }
`;
STabPanel.tabsRole = 'TabPanel';

const Video = styled.iframe`

`;

const Companyinfo = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
`;

const Tab = () => (
    <STabs
        selectedTabClassName='is-selected'
        selectedTabPanelClassName='is-selected'
        >
        <STabList>
            {result.videos.results && result.videos.results.length > 0
            && <STab>Youtube</STab>
            }
            <STab>Production Countries</STab>
            <STab>Production Company</STab>
        </STabList>
            {result.videos.results && result.videos.results.length > 0 &&
            <STabPanel>
                <Video width="100%" height="315" src={`https://www.youtube.com/embed/${result.videos.results[0].key}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
            </STabPanel>
        }
        <STabPanel>
            {result.production_countries &&
            result.production_countries.length > 0 ?
            result.production_countries.map((company, index) => 
                <Companyinfo>{company.name}</Companyinfo>
            ) : "정보가 없습니다."
            }
        </STabPanel>
        <STabPanel>
            {result.production_companies &&
            result.production_companies.length > 0 ? 
            result.production_companies.map((company, index) => 
                <Companyinfo>{company.name}</Companyinfo>
            ) : "정보가 없습니다."
            }
        </STabPanel>
        
    </STabs>
);

export default STab;