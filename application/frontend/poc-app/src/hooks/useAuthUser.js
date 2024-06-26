import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const useAuthUser = (url) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getCurentUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem("user");
                const currentUser = JSON.parse(savedUser);
                setUser(currentUser);
            } catch (error) {
                console.log(error);
            }
        };

         getCurentUser()
       
    }, []);

    return user;
};

export default useAuthUser;
