import { Searchbar } from "react-native-paper"
import { COLORS, SIZES } from "../constants/theme"
import { useState } from "react";
import IconActif from "./IconActif";

const SearchbarActif = ({search, setSearch, loading, style , placeholder}) => {
    return (
        <Searchbar
            mode='bar'
            placeholder={placeholder || "Rechercher un point de collecte"}
            style={{ borderRadius: SIZES.radius, display: 'flex', alignItems: 'center', margin: 10, backgroundColor: COLORS.whiteSmoke}}
            clearIcon={() => <IconActif name={'close-circle'} iconColor={COLORS.black} />}
            showDivider={false}
            value={search}
            onChangeText={(text) => setSearch(text)}
            onClearIconPress={() => setSearch("")}
            loading={loading || false}
            
        />
    )
}

export default SearchbarActif;