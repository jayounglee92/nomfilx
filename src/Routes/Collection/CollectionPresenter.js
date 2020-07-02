import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Loader from 'Components/Loader';
import Poster from 'Components/Poster';

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px 50px 0 50px;
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
    background-size: 100%;
    background-position: top center;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    margin-left: 10px;
    width: 70%;
`;

const ItemContainer = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill,125px);
    grid-gap: 25px;
`;

const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 20px;
`;

const CollectionPresenter = ({result, error, loading}) => 
loading ?(
    <>
    <Helmet>
        <title>Loaidng | Nomflix</title>
    </Helmet>
    <Loader/>
    </>
) : (
    <Container>
        <Helmet>
            <title>
                {result.name} | Nomfilx
            </title>
        </Helmet>
        <Backdrop
            bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
            <Cover
                bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`}
            />
            <Data>
                <Title>{result.name}</Title>
                {result.parts && result.parts.length > 0 && (
                    <ItemContainer>
                    {result.parts.map(item =>
                        <Poster
                            key={item.id}
                            id={item.id}
                            imageUrl={item.poster_path}
                            title={item.title}
                            rating={item.vote_average}
                            year={item.release_date}
                            isMovie={true}
                        />
                    )}
                    </ItemContainer>
                )}
            </Data>
        </Content>
    </Container>
)
;

CollectionPresenter.prototype = {
    result:PropTypes.object,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.string
};

export default CollectionPresenter;