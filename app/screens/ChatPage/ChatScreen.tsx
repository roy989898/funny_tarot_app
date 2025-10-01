import {Text, useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {GiftedChat} from "react-native-gifted-chat/src";
import {Day, IMessage} from "react-native-gifted-chat";
import {myColor} from "@/color";
import moment from "moment";

export default function ChatScreen() {


    const [messages, setMessages] = useState<IMessage[]>([])
    const theme = useTheme();

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    // avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: theme.colors.background
        }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                  style={styles.content}>


                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    locale="zh-tw"
                    //TODO custom renderDay
                    renderDay={(currentMessage) => {

                        // const { currentMessage } = props;
                        if (currentMessage && currentMessage.createdAt) {
                            const date = moment(currentMessage.createdAt);
                            const today = moment().startOf('day');
                            const yesterday = moment().subtract(1, 'days').startOf('day');

                            let dateText= date.format('YYYY年MM月DD日')
                            if (date.isSame(today, 'day')) {
                                dateText = '今天';
                            } else if (date.isSame(yesterday, 'day')) {
                                dateText = '昨天';
                            } else {
                                dateText = date.format('YYYY年MM月DD日');
                            }

                            return (
                                <Day
                                    {...currentMessage}
                                    dateFormat={dateText}
                                />
                            );
                        }
                        return null;
                    }}

                    //TODO custom placeholder
                    // placeholder="请输入消息..."

                />
            </KeyboardAvoidingView>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({

    content: {
        flex: 1,
        // paddingHorizontal: 24, // 8pt × 3
        paddingTop: 48, // 8pt × 6
        // paddingBottom: 32, // 8pt × 4
        /*   justifyContent: 'space-between',*/
    },

});
