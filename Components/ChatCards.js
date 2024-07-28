import { View } from 'react-native';
import { Text, Card } from '@rneui/themed';

import styles from '../css/styles';

export default function ChatCards(props) {
  return (
    <View>
      {
        props.chatMessages.map((messageData, index) => {
          const cardHeaderUser = messageData.sender;
          const cardBodyMessage = messageData.message;
          const cardBodyEvent = messageData.event;
          const cardFooterTime = messageData.time;

          //#region Keep line breaks / Mantém as quebras de linha
          let cardBodyMessageWithLineBreaks;

          if (cardBodyMessage) {
            const cardBodyMessageFormatted = cardBodyMessage.replace(/\\n/g, '\n');
            const lines = cardBodyMessageFormatted.split('\n');

            cardBodyMessageWithLineBreaks = lines.map((line, lineIndex) => (
              <Text key={lineIndex}>
                {line}
                {(lineIndex !== lines.length - 1) && '\n'}
              </Text>
            ));
          }
          //#endregion

          return (
            <Card key={index}>
              {
                (cardBodyEvent) ? (
                  <Text style={null}>
                    {cardBodyEvent}
                  </Text>
                ) : (
                  <>
                    <Text style={[styles.cardHeader, styles.fwBold, styles.labelColor]}>
                      {cardHeaderUser}
                    </Text>

                    <Text selectable style={styles.cardBody}>
                      {cardBodyMessageWithLineBreaks}
                    </Text>

                    <Text style={[styles.cardFooter, styles.fwBold, styles.labelColor]}>
                      {cardFooterTime}
                    </Text>
                  </>
                )
              }
            </Card>
          );
        })
      }
    </View>
  );
}