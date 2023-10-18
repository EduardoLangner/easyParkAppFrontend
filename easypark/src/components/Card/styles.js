import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    align-items: center;
`

export const Content = styled.View`
    width: 320px;
    height: 180px;
    background-color: #6B92A4;
    border-radius: 20px;
`

export const Strip = styled.View`
    width: 100%;
    height: 30px;
    margin-top: 25px;
    background-color: #BDBDBD;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`

export const TextCvv = styled.Text`
    margin-right: 20px;
`

export const View = styled.View`
    width: 80%;
    margin-top: 50px;
    padding: 14px;
`

export const Text = styled.Text`
    width: auto;
    max-height: 35px;
    margin-top: 3px;
    color: #ffffff;
    font-size: ${(props) => props.fontSize || '14px'};
    font-weight: ${(props) => props.bold || 'normal'}; 
`;

export const ViewInformation = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`