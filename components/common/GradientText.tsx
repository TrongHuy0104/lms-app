import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GradientText({
    text,
    styles,
}: {
    text: string;
    styles: any;
}) {
    return (
        // @ts-ignore
        <MaskedView
            maskElement={
                <View>
                    <Text style={[styles, { backgroundColor: 'transparent' }]}>
                        {text}
                    </Text>
                </View>
            }
        >
            <LinearGradient
                colors={['#6D55FE', '#8976FC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={[styles, { opacity: 0 }]}>{text}</Text>
            </LinearGradient>
        </MaskedView>
    );
}

const styles = StyleSheet.create({});
