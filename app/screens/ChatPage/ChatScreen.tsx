import {Text, useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {GiftedChat} from "react-native-gifted-chat/src";
import {Bubble, Day, IMessage, Send} from "react-native-gifted-chat";
import {myColor} from "@/color";
import moment from "moment";
import 'moment/locale/zh-cn';
import {QuickReplies} from "react-native-gifted-chat/lib/QuickReplies";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Chinese locale

// Set moment locale globally
moment.locale('zh-cn');

export default function ChatScreen() {

    // const [messages, setMessages] = useState<IMessage[]>([])
    const [messages, setMessages] = useState<IMessage[]>([
        {
            _id: 2,
            text: '您想了解哪方面的信息？',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Master',
            },
            quickReplies: {
                type: 'radio',
                keepIt: false, // Hide after selection
                values: [
                    {title: '📦 物流信息', value: 'logistics'},
                    {title: '💰 价格查询', value: 'price'},
                    {title: '🛠️ 技术支持', value: 'support'},
                    {title: '📞 联系客服', value: 'contact'},
                ],
            },
        },
        {
            _id: 1,
            text: '你好！欢迎咨询',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Master',
            },
        },
    ]);
    const theme = useTheme();

    /* useEffect(() => {
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
     }, [])*/

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
                    renderSend={(props) => (
                        <Send
                            {...props}
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 12,
                                marginLeft: 8,
                            }}
                        >
                            <View style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: theme.colors.primary, // Background color
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Ionicons
                                    name="send"
                                    size={18}
                                    color="#FFFFFF" // Icon color
                                />
                            </View>
                        </Send>
                    )}
                    onQuickReply={(quickReply) => {
                        // Handle quick reply selection
                        // TODO
                        console.log('Selected:', quickReply);
                    }}
                    renderQuickReplies={(props) => (
                        <QuickReplies
                            {...props}
                            color="#007AFF" // Background color of quick reply buttons
                            quickReplyStyle={{

                                backgroundColor: theme.colors.primaryContainer, // Button background
                                borderBlockColor: theme.colors.primaryContainer,
                                borderBlockEndColor: theme.colors.primaryContainer,
                                borderBlockStartColor: theme.colors.primaryContainer,
                                borderBottomColor: theme.colors.primaryContainer,
                                borderEndColor: theme.colors.primaryContainer,
                                borderStartColor: theme.colors.primaryContainer,// Border color
                            }}
                            quickReplyTextStyle={{

                                color: theme.colors.onPrimaryContainer, // Text color
                            }}
                        />
                    )}
                    renderBubble={(props) => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    left: {
                                        backgroundColor: theme.colors.primary, // Received message bubble color
                                    },
                                    right: {
                                        backgroundColor: theme.colors.secondary, // Sent message bubble color
                                    },
                                }}
                                textStyle={{
                                    left: {
                                        color: theme.colors.onPrimary, // Received message text color
                                    },
                                    right: {
                                        color: theme.colors.onSecondary, // Sent message text color
                                    },
                                }}
                            />
                        );
                    }}
                    bottomOffset={-80}
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    locale="zh-cn"
                    renderDay={(props) => {
                        // const { currentMessage } = props;
                        // Extract currentMessage from props

                        if (props && props.createdAt) {


                            return (
                                <Day
                                    {...props}

                                    //TODO
                                    dateFormatCalendar={{
                                        sameDay: "[Today]", // The same day ( Today at 2:30 AM )
                                        // nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
                                        // nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
                                        lastDay: "[Yesterday]", // The day before ( Yesterday at 2:30 AM )
                                        // lastWeek: "[Last] dddd [at] h:mm A", // Last week ( Last Monday at 2:30 AM )
                                        sameElse: "DD/MM/YYYY", // Everything else ( 17/10/2011 )
                                    }}
                                />
                            );
                        }


                        return null;
                    }}
                    //todo
                    placeholder="请输入消息..."


                />
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        // paddingTop: 48,
    },
});
