/* eslint-disable no-undef */
import React from 'react';
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface ISearchProps {
    items: string[];
    selected: string
    title: string
    onSelect: (item: string) => void;
}

export const Search = ({ items, title, selected, onSelect }: ISearchProps) => {

    return (
        <View className='flex items-start'>
            <Text className="font-['Inter-Medium'] text-black text-xs bg-white translate-y-2 translate-x-7 z-10 px-2">{title}</Text>
            <View className={`rounded-lg border-2 border-[#4A3FBC]/20 w-full text-black font-['Inter-SemiBold'] text-sm py-1.5`}>
                <SelectDropdown
                    data={items}
                    onSelect={(selectedItem, index) => {
                        onSelect(selectedItem)

                    }}
                    defaultButtonText={selected}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selected;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <Image source={require('../assets/icons/arrow-down.png')} className="h-4 w-4" style={{ tintColor: '#cbd5e1' }} />
                    }}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    search
                    searchInputTxtColor='black'
                    searchInputStyle={styles.dropdown2searchInputStyle}
                    searchPlaceHolder={''}
                    searchPlaceHolderColor={'#282a2e'}
                    renderSearchInputLeftIcon={() => {
                        return <Image source={require('../assets/icons/search.png')} className="h-6 w-6 translate-x-1 translate-y-0.5" style={{ tintColor: '#94a3b8' }} />
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown2BtnStyle: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
        color: '#000000',
        backgroundColor: '#fff',
        textAlign: 'left',
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        lineHeight: 20,
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        position: 'absolute',
        paddingBottom: 8,
        top: 50,
        left: 0,
    },
    dropdown2RowStyle: { backgroundColor: '#fff', borderBottomColor: '#f8fafc' },
    dropdown2RowTxtStyle: {
        color: '#282a2e',
        textAlign: 'left',
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        lineHeight: 20,
    },
    dropdown2searchInputStyle: {
        backgroundColor: '#f1f5f9',
        borderBottomWidth: 1,
        borderRadius: 0,
        borderBottomColor: '#FFF',
        fontFamily: 'Inter-SemiBold',

    },
});