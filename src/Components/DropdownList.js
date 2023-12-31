import { Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';

export default function DropdownList({placeholder, data}) {
    const [value, setValue] = useState(null);
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            search
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 43,
        width: 136,
        paddingHorizontal: 18,
        borderRadius: 8,
        borderColor: "#BFBFBF",
        borderWidth: 1,
        marginRight: 22
    },
    placeholderStyle: {
        fontSize: 12,
    },
    selectedTextStyle: {
        fontSize: 12,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
    },
})
