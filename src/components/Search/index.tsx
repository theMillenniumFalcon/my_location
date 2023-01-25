import React, { useEffect } from 'react'
import { Alert, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import * as Location from 'expo-location'

import styles from './styles'

export const Search = ({ handleSearchUser, devs, username, setUsername, setRegion }: any) => {
    const getCurrentPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert('Oops!', 'Access to location denied.')
        }

        let {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync()

        setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 })
    }

    useEffect(() => {
        getCurrentPosition()
    }, [])

    return (
        <View style={styles.searchContainer}>
            <TextInput
                placeholder={`${devs.length} Dev's found`}
                style={styles.searchInputText}
                onChangeText={setUsername}
                value={username}
            />

            <RectButton style={styles.searchUserButton} onPress={handleSearchUser}>
                <MaterialCommunityIcons
                    name="map-search-outline"
                    size={24}
                    color="#fff"
                />
            </RectButton>
        </View>
    )
}