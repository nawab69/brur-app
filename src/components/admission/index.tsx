import { View } from "react-native";
import { Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "../button";
import { Search } from "../search";
import { useState } from "react";

enum AdmissionType {
    Regular = 'Regular',
    ReAdmission = 'Re-Admission'
}

enum AdmissionYear {
    FirstYear = '1st Year',
    SecondYear = '2nd Year',
    ThirdYear = '3rd Year',
    FourthYear = '4th Year',
}

enum AdmissionSemester {
    FirstSemester = '1st Semester',
    SecondSemester = '2nd Semester',
}

const examYears = [
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
]

export function Admission({ close }: { close?: any }) {

    const [admissionType, setAdmissionType] = useState<AdmissionType>(AdmissionType.Regular)
    const [admissionYear, setAdmissionYear] = useState<AdmissionYear>(AdmissionYear.FirstYear)
    const [admissionSemester, setAdmissionSemester] = useState<AdmissionSemester>(AdmissionSemester.FirstSemester)
    const [examYear, setExamYear] = useState<string>('2023')

    return (
        <KeyboardAvoidingView>
            <Text className="font-['Inter-Medium'] text-main text-[18px] capitalize -mt-4 pb-3 mb-4 text-center border-b border-slate-300">Admission</Text>

            <View className="space-y-0">
                <Search title='Admission Type *' items={Object.values(AdmissionType)} onSelect={(selected) => { setAdmissionType(selected as AdmissionType) }} selected={admissionType} />
                <Search title='Admission Year *' items={Object.values(AdmissionYear)} onSelect={(selected) => { setAdmissionYear(selected as AdmissionYear) }} selected={admissionYear} />
                <Search title='Admission Semester *' items={Object.values(AdmissionSemester)} onSelect={(selected) => { setAdmissionSemester(selected as AdmissionSemester) }} selected={admissionSemester} />
                <Search title='Exam Year *' items={examYears} onSelect={(selected) => { setExamYear(selected) }} selected={examYear} />
                <Button disabled={false} onPress={() => { }}>Generate Pay Slip</Button>
            </View>
        </KeyboardAvoidingView>
    )
}