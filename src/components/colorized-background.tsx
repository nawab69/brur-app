import { BlurView } from "@react-native-community/blur";
import { Image, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const ColorizedBackground = ({ children }: { children: any }) => {
    return (
        <View className='flex-1 bg-white'>
            <Image source={require('../assets/images/bg1.jpg')} className="absolute object-cover h-48 w-full z-0" />
            <BlurView
                blurType="light"
                blurAmount={20}
                className='w-full h-1/2 bottom-0 z-10'
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    useAngle
                    angle={110}
                    className='h-full w-full'
                >
                    {children}
                </LinearGradient>
            </BlurView>
        </View>
    );
};