import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 72,
        left: 24,
        right: 24,

        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    searchInputText: {
        width: 200,
        color: '#8fa7b3',
    },

    searchUserButton: {
        width: 56,
        height: 56,
        backgroundColor: '#1d1a1a',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },
})