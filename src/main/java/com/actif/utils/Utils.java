package com.actif.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class Utils {

    public static String generateRandomString(int size) {
        String generatedString = RandomStringUtils.randomAlphabetic(size);

        return generatedString;
    }

    public static String generateRandomString() {
        String generatedString = RandomStringUtils.randomAlphabetic(5);

        return generatedString;
    }

    public static String generatedRamdomCode(int n){
        // choose a Character random from this String
        String AlphaNumericString = "0123456789"
                ;

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        return sb.toString();
        //return "password";
    }


}
