import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    calloutContainer: {
        width: 160,
        height: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },

    calloutText: {
        color: '#0089a5',
        textDecorationLine: 'underline',
        fontSize: 14,
    },

    calloutSmallText: {
        color: '#005555',
        fontSize: 10,
    },
})