import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Text = styled.div`
    color: ${props => props.color};
    font-weight: 600;
`;

const Message = ({ color, text }) => (
    <Container>
        <Text color={color}>{text}</Text>
    </Container>
);

Message.prototype = {
    text:PropTypes.string.isRequired,
    color:PropTypes.string.isRequired
}

export default Message;