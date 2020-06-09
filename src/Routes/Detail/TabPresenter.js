import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactCountryFlag from "react-country-flag";

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
    padding: 8px 15px;
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
    transition: border-bottom 0.1s linear;
    box-sizing: border-box;
    font-size: 16px;

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

const VideoContainer = styled.div`
    background: no-repeat center/40% url(${require("../../assets/loadingBgSmall.gif")});
`;

const Video = styled.iframe`
`;

const TitleInfo = styled.h3`
    margin-bottom: 10px;
    font-size: 16px;
    border-bottom: 1px solid white;
    padding-bottom: 10px;
`;

const ProductionContainer = styled.div`
    padding: 10px;
`;

const CompaniesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 140px);
    gap: 15px;
`;

const Company = styled.div`
    height: 100px;
    background: no-repeat center/50% url(${(props) => props.bgUrl});
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContriesContainer = styled.div`

`;

const CountryName = styled.span`
    display: inline-block;
    margin-left: 10px;
`;

const TextInfo = styled.p`
    font-size: 14px;
    text-align: center;
`;

const TabPresenter = ({result}) => (
    <STabs
        selectedTabClassName='is-selected'
        selectedTabPanelClassName='is-selected'
        >
        <STabList>
            {result.videos.results && result.videos.results.length > 0
            && <STab>Youtube</STab>
            }
            <STab>Production</STab>
            <STab>Production Company</STab>
        </STabList>
        {result.videos.results && result.videos.results.length > 0 &&
        <STabPanel current={"video"}>
            <VideoContainer>
                <Video width="100%" height="315" src={`https://www.youtube.com/embed/${result.videos.results[0].key}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
            </VideoContainer>
        </STabPanel>
        }
        <STabPanel>
            
            <ProductionContainer>
                <TitleInfo>Production Companies</TitleInfo>
                <CompaniesContainer>
                    {result.production_companies &&
                    result.production_companies.length > 0 ?
                    result.production_companies.map((company, index) =>
                    <Company
                        bgUrl={company.logo_path ? 
                        `https://image.tmdb.org/t/p/w300${company.logo_path}`
                        : `/`}
                        >
                        {company.logo_path ? 
                        <TextInfo></TextInfo> 
                        : <TextInfo>{company.name}</TextInfo>}
                    </Company>
                        
                    ) : "None"
                    }
                </CompaniesContainer>
            </ProductionContainer>
            <ProductionContainer>
            <TitleInfo>Production Countries</TitleInfo>
            {result.production_countries &&
            result.production_countries.length > 0 ?
            result.production_countries.map((country, index) => 
                <ContriesContainer>
                <ReactCountryFlag
                countryCode={country.iso_3166_1}
                svg
                style={{
                    width: '2em',
                    height: '2em',
                }}
                title={country.iso_3166_1}
            /><CountryName>{country.name}</CountryName></ContriesContainer>
            ) : "None"
            }
            </ProductionContainer>
            
        </STabPanel>
        <STabPanel>
            {result.production_companies &&
            result.production_companies.length > 0 ? 
            result.production_companies.map((company, index) => 
                <TextInfo>{company.name}</TextInfo>
            ) : "None"
            }
            <ReactCountryFlag countryCode="US" />
        </STabPanel>
        
    </STabs>
);

TabPresenter.propTypes ={
    result:PropTypes.object
};

export default TabPresenter;