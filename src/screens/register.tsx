import { useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ColorizedBackground } from "../components/colorized-background";
import { routes } from "../constant";
import { Formik } from "formik";
import * as yup from 'yup'
import { useToasts } from "../utils/useToasts";
import { useRegisterMutation } from "../redux/slices/auth/authApiSlice";
import { Button } from "../components/button";

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    studentId: yup.string().required().min(7),
    password: yup
        .string()
        .required('Please Enter your password')
        .min(8)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    confirmpass: yup
        .string()
        .min(8)
        .required('Please retype your password.')
        .oneOf([yup.ref('password')], 'Your passwords do not match.')
})

export const Register = ({
    navigation,
}: any) => {
    // hook
    const toast = useToasts()

    // api
    const [register, { isLoading }] = useRegisterMutation()


    const handleRegister = async (email: string, password: string, name: string, studentId: string) => {
        console.log(email, password, name, studentId)
        try {
            toast.dismiss()
            toast.loading("Signing up ...")
            const user = await register({ email, password, name, studentId }).unwrap()
            if (user && user?.email) {
                toast.success("Sign up successful.")
                navigation.navigate(routes.LOGIN)
            } else {
                throw new Error("Something went wrong")
            }
        } catch (error: any) {
            console.log(error)
            toast.dismiss()
            toast.error(error?.message)
        }
    };

    return (
        <ColorizedBackground>
            <KeyboardAvoidingView className="flex-1 z-10">
                <View className="justify-center items-center">
                    <Text className="text-xl font-bold text-gray-700 mb-20 mt-10 tracking-wider">BRUR Assistant</Text>
                </View>
                <Formik
                    initialValues={{ email: '', password: '', confirmpass: '', name: '', studentId: '' }}
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        const { email, password, name, studentId } = values
                        handleRegister(email, password, name, studentId)
                        // actions.resetForm()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View className="flex-1 p-6">
                            <Text className="text-2xl font-bold text-gray-700 mb-6">Sign Up</Text>
                            <Text className="text-gray-500 mb-8">Enter your email and password!</Text>
                            <View className="mb-4">
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholder="Name"
                                    className="bg-gray-100 px-4 py-2 rounded"
                                />
                                {
                                    errors.name && <Text className="font-['Inter-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.name}</Text>
                                }
                            </View>
                            <View className="mb-4">
                                <TextInput
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}

                                    placeholder="Email"
                                    className="bg-gray-100 px-4 py-2 rounded"
                                />
                                {
                                    errors.email && <Text className="font-['Inter-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.email}</Text>
                                }
                            </View>
                            <View className="mb-4">
                                <TextInput
                                    onChangeText={handleChange('studentId')}
                                    onBlur={handleBlur('studentId')}
                                    value={values.studentId}

                                    placeholder="Student Id"
                                    className="bg-gray-100 px-4 py-2 rounded"
                                />
                                {
                                    errors.studentId && <Text className="font-['Inter-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.studentId}</Text>
                                }
                            </View>
                            <View className="mb-4">
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="Password"
                                    className="bg-gray-100 px-4 py-2 rounded"
                                    secureTextEntry
                                />
                                {
                                    errors.password && <Text className="font-['Inter-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.password}</Text>
                                }
                            </View>
                            <View className="mb-4">
                                <TextInput
                                    onChangeText={handleChange('confirmpass')}
                                    onBlur={handleBlur('confirmpass')}
                                    value={values.confirmpass}
                                    placeholder="Confirm Password"
                                    className="bg-gray-100 px-4 py-2 rounded"
                                    secureTextEntry
                                />
                                {
                                    errors.confirmpass && <Text className="font-['Inter-Medium'] text-red-500 text-xs px-2 capitalize mt-1">{errors.confirmpass}</Text>
                                }
                            </View>

                            <Button disabled={isLoading} onPress={handleSubmit}>Sign Up</Button>


                            <View className="justify-center items-center mt-6">
                                <Text className="text-gray-500">
                                    Already have an account?
                                </Text>
                                <TouchableOpacity className="mt-2" onPress={() => {
                                    // Navigate to login screen
                                    navigation.navigate(routes.LOGIN);
                                }}>
                                    <Text className="font-semibold">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)}
                </Formik>
            </KeyboardAvoidingView>

        </ColorizedBackground>
    )
}