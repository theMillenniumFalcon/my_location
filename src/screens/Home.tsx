import React, { useState, useEffect } from "react"
import { StyleSheet, View, ImageBackground, Image } from "react-native"
import { Text } from "react-native-paper"
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"
import { ScrollView } from "react-native"

export const HomeScreen = () => {
    const [InitialState, setInitialState] = useState({
        location: null,
        geocode: null,
        errorMessage: ""
    })

    useEffect(() => {
        getLocationAsync()
    }, [])

    const getLocationAsync = async () => {
        /** ensure that all permissions exist */
        let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
        if (status !== "granted") {
            setInitialState(InitialState => ({
                ...InitialState,
                errorMessage: 'Permission to access location was denied'
            }))
        }

        /** query for current location */
        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        })

        /** extract coordinates from current location */
        const { latitude, longitude } = location.coords

        /** for reverse lookup of coordinates for location name  */
        getGeocodeAsync({ latitude, longitude })

        /** propagate changes throughout component */
        setInitialState(InitialState => ({
            ...InitialState,
            location: { latitude, longitude } as any
        }))
    }

    const getGeocodeAsync = async (location:
        Pick<Location.LocationGeocodedLocation, "latitude" | "longitude">) => {
        let geocode = await Location.reverseGeocodeAsync(location) as any
        setInitialState(InitialState => ({
            ...InitialState,
            geocode
        }))
    }

    return (
        <ImageBackground
            source={require("../assets/backdrop.gif")}
            blurRadius={5}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <Image
                    source={require("../assets/location-pin.png")}
                    style={{ width: 100, height: 100 }}
                />
                <Text style={styles.heading1}>
                    {geocode ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` : ""}
                </Text>
                <Text style={styles.heading2}>
                    {geocode ? geocode[0].street : ""}
                </Text>
                <Text style={styles.heading3}>
                    {location ? `${location.latitude}, ${location.longitude}` : ""}
                </Text>
                <Text style={styles.heading2}>{InitialState.errorMessage}</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        backgroundColor: "#00000070",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    heading1: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
        margin: 20,
    },
    heading2: {
        color: "#fff",
        margin: 5,
        fontWeight: "bold",
        fontSize: 15,
    },
    heading3: {
        color: "#fff",
        margin: 5,
    },
});