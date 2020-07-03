import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Loader from 'Components/Loader';
import TabPresenter from './TabPresenter';

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

const CollectionLink = styled.a`
    font-size: 13px;
    width: 20px;
    height: 10px;
    background-color: rgba(0, 51, 204,0.5);
    color: black;
    border: 5px;
    box-sizing: border-box;
    padding: 2px 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: rgba(0, 51, 204,1);
    }
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
    background-color: rgba(245,197,24,0.8);
    color: black;
    border: 5px;
    box-sizing: border-box;
    padding: 2px 5px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: rgba(245,197,24,1);
    }
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
                    {result.title ? result.title: ''}<br/> 
                    {result.original_title 
                    ? (result.original_title === result.title ? '' : result.original_title ) 
                    : (result.original_name === result.title ? '' : result.original_name )}
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
                    {result.belongs_to_collection ? 
                    <>
                    <Divider>•</Divider>
                    <CollectionLink href={`/collection/${result.belongs_to_collection.id}`}>See Series</CollectionLink>
                    </>
                    : ''                
                    }
                </ItemContainer>
                <Overview>
                    {result.overview}
                </Overview>
                <TabPresenter result={result} />
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