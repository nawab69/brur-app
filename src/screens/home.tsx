import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ColorizedBackground } from "../components/colorized-background";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import { routes } from "../constant";
import { useState } from "react";
import { Portal } from "@gorhom/portal";
import { Sheet } from "../components/sheet";
import { Admission } from "../components/admission";
import { FormFillUp } from "../components/form-fillup";
import { AdmitCard } from "../components/admit";
import { Payment } from "../components/payment";
import { UploadPayslip } from "../components/upload-payslip";

export const Home = ({
  navigation
}: any) => {

  const [isAdmissionOpen, setIsAdmissionOpen] = useState<boolean>(false)
  const [isFormFillupOpen, setIsFormFillupOpen] = useState<boolean>(false)
  const [isAdmitOpen, setIsAdmitOpen] = useState<boolean>(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false)
  const [isUploadPayslipOpen, setIsUploadPayslipOpen] = useState<boolean>(false)

  const gridItems = [
    { title: 'Admission', imageSrc: require('../assets/images/admission.png'), color: 'green', onPress: () => setIsAdmissionOpen(true) },
    { title: 'Form fillup', imageSrc: require('../assets/images/formfillup.png'), color: 'yellow', onPress: () => setIsFormFillupOpen(true) },
    { title: 'Payment', imageSrc: require('../assets/images/payment-cashless.png'), color: 'blue', onPress: () => setIsPaymentOpen(true) },
    { title: 'Admit Card', imageSrc: require('../assets/images/admit-card.png'), color: 'indigo', onPress: () => setIsAdmitOpen(true) },
    {
      title: 'Payment History', imageSrc: require('../assets/images/payment.png'), color: 'purple', onPress: () => navigation.navigate({
        name: routes.HISTORY,
      })
    },
    { title: 'Upload Payslip', imageSrc: require('../assets/images/payslip.png'), color: 'cyan', onPress: () => setIsUploadPayslipOpen(true) },
  ];

  const renderItem = (item: any, index: number) => (
    <TouchableOpacity key={index} className="w-1/2 p-4">
      <View className="bg-blue-200 border-1 border-blue-200 rounded-lg p-4 items-center justify-center">
        <Image source={item.imageSrc} className="w-16 h-16 mb-2" />
        <Text className="font-semibold">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (


    <View className="flex-1">
      <View className="rounded-lg mx-3 mt-12 py-2 overflow-hidden">
        <Image source={require('../assets/images/bg1.jpg')} className="absolute rounded-lg object-cover h-full w-full z-0 mt-2" />
        <BlurView
          blurType="light"
          blurAmount={20}
          className='w-full bottom-0 z-10 rounded-lg'
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            useAngle
            angle={110}
          >
            <View className="p-4 rounded-lg">
              <View className="flex flex-row items-center">
                <Image source={require('../assets/images/admission.png')} className="w-24 h-12" />
                <View className="flex items-center flex-1">
                  <Text className="text-3xl font-semibold italic text-gray-700 break-normal font-poppins">
                    Welcome to
                  </Text>
                  <Text className="text-xl text-green-600 break-normal font-poppins font-semibold">
                    BRUR Assistant
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

      </View>
      <ScrollView>
        <View className="flex flex-row flex-wrap mt-8">
          {/* Mapping has some problem with dynamic color*/}

          <TouchableOpacity key={"home-admission"} className="w-1/2 p-4" onPress={gridItems[0].onPress}>
            <View className="bg-blue-200/50 border border-blue-400 rounded-lg p-4 items-center justify-center">
              <Image source={gridItems[0].imageSrc} className="w-16 h-16 mb-2" />
              <Text className="font-semibold">{gridItems[0].title}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={"home-form"} className="w-1/2 p-4" onPress={gridItems[1].onPress}>
            <View className="bg-amber-200/50 border border-amber-400 rounded-lg p-4 items-center justify-center">
              <Image source={gridItems[1].imageSrc} className="w-16 h-16 mb-2" />
              <Text className="font-semibold">{gridItems[1].title}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={"home-profile"} className="w-1/2 p-4" onPress={gridItems[2].onPress}>
            <View className="bg-indigo-200/50 border border-indigo-400 rounded-lg p-4 items-center justify-center">
              <Image source={gridItems[2].imageSrc} className="w-16 h-16 mb-2" />
              <Text className="font-semibold">{gridItems[2].title}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={"home-admit"} className="w-1/2 p-4" onPress={gridItems[3].onPress}>
            <View className="bg-green-200/50 border border-green-400 rounded-lg p-4 items-center justify-center">
              <Image source={gridItems[3].imageSrc} className="w-16 h-16 mb-2" />
              <Text className="font-semibold">{gridItems[3].title}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={"home-payment"} className="w-1/2 p-4" onPress={gridItems[4].onPress}>
            <View className="bg-lime-200/50 border border-lime-400 rounded-lg p-4 items-center justify-center">
              <Image source={gridItems[4].imageSrc} className="w-16 h-16 mb-2" />
              <Text className="font-semibold">{gridItems[4].title}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={"home-payslip"} className="w-1/2 p-4" onPress={gridItems[5].onPress}>
            <View className="bg-yellow-100/50 border border-yellow-400 rounded-lg p-4 items-center justify-center">
              <Image source={gridItems[5].imageSrc} className="w-16 h-16 mb-2" />
              <Text className="font-semibold">{gridItems[5].title}</Text>
            </View>
          </TouchableOpacity>


        </View>
      </ScrollView>

      <Portal>
        {isAdmissionOpen && (
          <Sheet snaps={['60%', '95%']} setIsOpen={() => setIsAdmissionOpen(false)}>
            <Admission />
          </Sheet>
        )}

        {isFormFillupOpen && (
          <Sheet snaps={['60%', '95%']} setIsOpen={() => setIsFormFillupOpen(false)}>
            <FormFillUp />
          </Sheet>
        )}

        {isAdmitOpen && (
          <Sheet snaps={['60%', '95%']} setIsOpen={() => setIsAdmitOpen(false)}>
            <AdmitCard />
          </Sheet>
        )}

        {isPaymentOpen && (
          <Sheet snaps={['45%', '95%']} setIsOpen={() => setIsPaymentOpen(false)}>
            <Payment />
          </Sheet>
        )}

        {isUploadPayslipOpen && (
          <Sheet snaps={['50%', '75%', '95%']} setIsOpen={() => setIsUploadPayslipOpen(false)}>
            <UploadPayslip />
          </Sheet>
        )}

      </Portal>
    </View>

  )



}