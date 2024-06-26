
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ButtonActif from './ButtonActif';
const ImagePicker = ({ type , title}) => {

    async function takeImage() {

        const options = {
            title: '‘Select Avatar',

            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo'
        };

        const result = await launchImageLibrary(options);
        console.log("🚀 ~ file: ImagePicker.js:9 ~ takeImage ~ result:", result)
    }

    
    async function launchCam() {

        const options = {
            title: '‘Select Avatar',

            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo'
        };

        const result = await launchCamera(options);
        console.log("🚀 ~ file: ImagePicker.js:9 ~ takeImage ~ result:", result)
    }

    return (
        type == "camera" ? <ButtonActif icon={"camera"} title={ title || "Prendre une image"} onPress={launchCam} />
            :
            <ButtonActif icon={"image-multiple"} title={title || "Selectionner une image"} onPress={takeImage} />
    )

}

export default ImagePicker