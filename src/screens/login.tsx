import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ColorizedBackground } from "../components/colorized-background";
import { routes } from "../constant";
import { Formik } from "formik";
import * as yup from 'yup'
import { useLoginMutation } from "../redux/slices/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useToasts } from "../utils/useToasts";
import { setCredentials, setCredentialsLocally } from "../redux/slices/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../components/button";

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup
        .string()
        .required('Please Enter your password')
})

export const Login = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(true)

    const [login, { isLoading }] = useLoginMutation()
    const toast = useToasts()


    const _login = async (email: string, password: string) => {
        try {
            toast.dismiss()
            toast.loading("Loggin in...")
            const userData: any = await login({ email, password }).unwrap()
            const { token, refreshToken, ...user } = userData

            await dispatch(setCredentials({ token, refreshToken, user }))
            await dispatch(setCredentialsLocally({ token, refreshToken, user }))
            toast.success("Log in Successfull")
            navigation.navigate(routes.BOTTOM_TAB)
        } catch (error: any) {
            console.log(error)
            toast.dismiss()
            toast.error(error?.message)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    const checkCurrentUser = async () => {
        console.log("loading", loading);
        try {
            const currentUser = await AsyncStorage.getItem('userInfo');
            const currentToken = await AsyncStorage.getItem('token');
            const currentRefreshToken = await AsyncStorage.getItem('refreshToken')

            const user = JSON.parse(currentUser!);
            const token = JSON.parse(currentToken!);
            const refreshToken = JSON.parse(currentRefreshToken!)

            console.log(user && user?.email && token, user, token)

            // Sent to HomeScreen is User is Available and token 
            if (user && user?.email && token && refreshToken) {
                dispatch(setCredentials({ user, token, refreshToken }));
                navigation.navigate(routes.BOTTOM_TAB);
                console.log("loading from layout effect", loading)
            }

        } catch (error: any) {
            toast.dismiss();
            toast.error(error?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        checkCurrentUser()
    }, [])

    return loading ? <View className="flex-1 items-center justify-center"><ActivityIndicator /></View> : (
        <ColorizedBackground>
            <View className="flex-1 z-10">
                <View className="justify-center items-center">
                    <Text className="text-xl font-bold text-gray-700 mb-20 mt-10 tracking-wider">BRUR Assistant</Text>
                </View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        _login(values.email, values.password)
                        actions.resetForm()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View className="flex-1 p-6">
                            <Text className="text-2xl font-bold text-gray-700 mb-6">Sign In</Text>
                            <Text className="text-gray-500 mb-8">Enter your email and password!</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="Email"
                                keyboardType="email-address"
                                className="bg-gray-100 px-4 py-2 rounded mb-4"
                            />
                            <TextInput
                                secureTextEntry
                                autoCorrect={false}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Password"
                                className="bg-gray-100 px-4 py-2 rounded mb-8"
                            />
                            <Button disabled={isLoading} onPress={handleSubmit}>Sign in</Button>
                            {/* <TouchableOpacity onPress={_login} className="bg-green-500 px-4 py-2 rounded">
                                <Text className="text-white text-center font-semibold">Sign In</Text>
                            </TouchableOpacity> */}
                            <View className="justify-center items-center mt-6">
                                <Text className="text-gray-500">Don't have an account?
                                </Text>
                                <TouchableOpacity className="mt-2" onPress={() => {
                                    // Navigate to register screen
                                    navigation.navigate(routes.REGISTER);

                                }}>
                                    <Text className="font-semibold">Sign Up</Text>
                                </TouchableOpacity>

                            </View>
                        </View>)
                    }
                </Formik>
            </View>

        </ColorizedBackground>
    )
}