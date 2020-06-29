import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Loader from 'Components/Loader';

const Container = styled.div``;
const CollectionsPresenter = ({result, error, loading}) => 
loading ?(
    <>
    <Helmet>
        <title>Loaidng | Nomflix</title>
    </Helmet>
    <Loader/>
    </>
) : (
    <Container>

    </Container>
)
;

CollectionsPresenter.prototype = {
    result:PropTypes.object,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.string
};

export default CollectionsPresenter;