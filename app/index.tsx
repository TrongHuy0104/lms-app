import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';

const Index = () => {
    const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await SecureStore.getItemAsync('accessToken');
            setLoggedInUser(!!token);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return null; // or return a loading spinner
    }

    return (
        <>
            {loggedInUser ? (
                //@ts-ignore
                <Redirect href="/tabs" />
            ) : (
                //@ts-ignore
                <Redirect href="/onboarding" />
            )}
        </>
    );
};

export default Index;
