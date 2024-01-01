import { View, StyleSheet, Text } from 'react-native';

export default IngredientButton = (props) => {
    return (
        <View style={styles.container} key={props.id}>
            <Text style={styles.content}> {props.name} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#70001A',
        height: 30,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center', 
        margin: 5,
        backgroundColor: '#FFA3B9',
    },
    content: {
        color: '#70001A',
        fontSize: 12
    }
});
