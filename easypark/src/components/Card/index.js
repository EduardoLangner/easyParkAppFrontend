import React from 'react';

import { Container, Content, Strip, TextCvv, View, Text, ViewInformation } from './styles';

export default ({ card, back, flag }) => {
    return (
        <Container>
            <Content>
                {back ? (
                    <Strip>
                        <TextCvv>{card.cvv}</TextCvv>
                    </Strip>
                ) : (
                    <ViewInformation>
                        <View>
                            <Text fontSize="18px" bold="bold">{card.number}</Text>
                            <Text fontSize="16px" bold="normal">{card.name}</Text>
                            <Text fontSize="13px" bold="normal">{card.validate}</Text>
                        </View>
                        {/* {flag ? (
                            flag.flag
                        ) : (
                            null
                        )} */}
                    </ViewInformation>
                )}
            </Content>
        </Container>
    )
}
