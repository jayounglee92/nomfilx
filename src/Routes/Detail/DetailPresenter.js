import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from 'Components/Loader';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px 50px 0px 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: top center;
  background-size: 100%;
  background-repeat: no-repeat;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 20px;

`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`

`;

const ImdbBtn = styled.a`
    all: unset;
    width: 20px;
    height: 10px;
    background-color: rgb(245,197,24);
    color: black;
    border: 5px;
    box-sizing: border-box;
    padding: 2px 5px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 2;
    width: 50%;
`;

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

const DetailPresenter = ({result, error, loading}) =>
    loading ? (
        <>
        <Helmet>
            <title>Loading | Nomflix</title>
        </Helmet>
        <Loader/>
        </>
    ) : (
    <Container>
        <Helmet>
            <title>{result.original_title 
                    ? result.original_title 
                    : result.original_name} | Nomflix</title>
        </Helmet>
        <Backdrop 
            bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
            <Cover 
                bgImage={result.poster_path 
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
                }
            />
            <Data>
                <Title>
                    {result.original_title 
                    ? result.original_title 
                    : result.original_name}
                </Title>
                <ItemContainer>
                    {result.release_date 
                     ? <><Item>{result.release_date.substring(0,4)}</Item></>
                     : <><Item>{result.first_air_date.substring(0,4)}</Item></>
                     }
                     {result.runtime 
                     ? <><Divider>•</Divider><Item>{result.runtime} min</Item></>
                     : <><Divider>•</Divider><Item>{result.episode_run_time} min</Item></>
                     }
                     {result.runtime 
                     ? <><Divider>•</Divider><Item>{result.runtime} min</Item></>
                     : <><Divider>•</Divider><Item>{result.episode_run_time} min</Item></>
                     }
                     <Divider>•</Divider>
                     {result.genres && result.genres.map((genre, index) => 
                        index === result.genres.length-1 
                        ? genre.name
                        :`${genre.name} / `)
                    }
                    {result.imdb_id && (
                        <>
                            <Divider>•</Divider>
                            <Item>
                                <ImdbBtn href={`https://www.imdb.com/title/${result.imdb_id}/`} target="_blank" rel="noopener noreferrer">
                                Imdb
                                </ImdbBtn>
                            </Item>
                        </>
                    )
                    }
                </ItemContainer>
                <Overview>
                    {result.overview}
                </Overview>
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
            </Data>
        </Content>
    </Container>
);

DetailPresenter.propTypes ={
    result:PropTypes.object,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.string
};

export default DetailPresenter;