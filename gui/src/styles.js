import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    galleryContainer: { 
        bottom: 100 
    },
    galleryImageContainer: { 
        width: 75, 
        height: 75, 
        marginRight: 5 
    },
    galleryImage: { 
        width: 75, 
        height: 75 
    },
    styleImageContainer: { 
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleImage: { 
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -1
    },
    selectingStylesImage: { 
        width: Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').height / 1.5,
        //width: 100,
        //height: 100,
        //position: 'absolute',
        //alignSelf: 'center',
        //bottom: 20,
        zIndex: -1
    },
    slideBarHeader: {
        alignSelf: 'center',
    },
    rowsColsInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        bottom: 10,
    },
    backButton: {
        margin: 15,
        width: 45,
        paddingTop: 15,
        paddingHorizontal: 10,
        position: "absolute",
        zIndex: 2,
      },
    gridContainer: {
        flexDirection: "row",
        //flexWrap: "wrap",
        bottom: 10,
        maxHeight: 'auto',
        maxWidth: 'auto',
        //width: Dimensions.get('window').width / 1.7,
        //height: Dimensions.get('window').height / 1.7,
        justifyContent: 'center'
    },
    grid: {
        width: (Dimensions.get('window').width)/1.5,
        height: (Dimensions.get('window').height)/1.5,
        zIndex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    advanceButton: {
        width: 45, 
        height: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 2
    },
    bottom: {
        position: 'absolute',
        bottom: 10
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    rowsColsButtonsContainer: {
        flexDirection: 'row',
    },
    rowsButtonsContainer: {
        flexDirection: 'row',
    },
    colsButtonsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    rowsButton: {
        margin: 1,
        width: 45,
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: 'lightgreen',
        borderRadius: 25
    }
});