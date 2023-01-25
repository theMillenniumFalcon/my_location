import React, { useEffect, useState } from 'react'
import { Alert, Linking, Text, View } from 'react-native'
import MapView, {
    Callout,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from 'react-native-maps'
import * as Location from 'expo-location'
import styles from './styles'
import { fetchUserGithub, fetchLocalMapBox } from '../../services/api'

import { Search } from '../Search'

interface Dev {
    id: number
    avatar_url: string
    name: string
    bio: string
    login: string
    location: string
    latitude?: number
    longitude?: number
    html_url: string
}

const initialRegion = {
    latitude: -20.814911,
    longitude: -49.3732129,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
}

export const Map = () => {
    const [devs, setDevs] = useState<Dev[]>([])
    const [username, setUsername] = useState('')
    const [region, setRegion] = useState<Region>()

    const getCurrentPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert('Oops!', ' Access to location denied.')
        }

        let {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync()

        setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 })
    }

    useEffect(() => {
        getCurrentPosition()
    }, [])

    function handleOpenGithub(url: string) {
        Linking.openURL(url)
    }

    async function handleSearchUser() {
        let dev: Dev

        if (!username) return

        const githubUser = await fetchUserGithub(username)

        if (!githubUser || !githubUser.location) {
            Alert.alert(
                'Ops!',
                'User not found or does not have the location defined on Github'
            )
            return
        }

        const localMapBox = await fetchLocalMapBox(githubUser.location)

        if (!localMapBox || !localMapBox.features[0].center) {
            Alert.alert(
                'Ops!',
                "Error converting the user's locality to geographic coordinates!"
            )
            return
        }

        const [longitude, latitude] = localMapBox.features[0].center

        dev = {
            ...githubUser,
            latitude,
            longitude,
        }

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
        })

        const devAlreadyExists = dev && devs.find((user) => user.id === dev.id)

        if (devAlreadyExists) return

        setDevs([...devs, dev])
        setUsername('')
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                initialRegion={initialRegion}
                showsUserLocation
            >
                {devs.map((dev) => (
                    <Marker
                        key={dev.id}
                        image={{ uri: `${dev.avatar_url}&s=120` }}
                        calloutAnchor={{
                            x: 2.9,
                            y: 0.8,
                        }}
                        coordinate={{
                            latitude: Number(dev.latitude),
                            longitude: Number(dev.longitude),
                        }}
                    >
                        <Callout tooltip onPress={() => handleOpenGithub(dev.html_url)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{dev.name}</Text>
                                <Text style={styles.calloutSmallText}>{dev.bio}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <Search
                handleSearchUser={handleSearchUser}
                devs={devs}
                username={username}
                setUsername={setUsername}
                setRegion={setRegion}
            />
        </View>
    )
}