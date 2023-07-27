import React from 'react'
import styled from 'styled-components/native'

const InputArea = styled.View`
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #000000;
    margin-bottom: 5px;
`

export default () => {
    return (
        <InputArea />
    )
}