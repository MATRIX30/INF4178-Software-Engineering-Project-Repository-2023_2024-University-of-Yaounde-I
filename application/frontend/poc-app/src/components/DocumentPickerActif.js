import DocumentPicker from 'react-native-document-picker'
import ButtonActif from './ButtonActif'
export default function DocumentPickerActif(){

    const handlePick = async ()=> {

        const  res = await DocumentPicker.pickSingle(
            {allowMultiSelection : true,

            })
        console.log("🚀 ~ file: DocumentPickerActif.js:8 ~ handlePick ~ res:", res)

    }


    return (
        <ButtonActif
        icon={"file-upload"}
        onPress={handlePick}
        title={"pick an document"}
        />
    )
}