package com.actif.QRcode;


import com.google.zxing.WriterException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Base64;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/qrcode")
public class QRCodeGeneratorController {
    private static final String QR_CODE_IMAGE_PATH = "./src/main/resources/static/img/QRCode.png";

//    @GetMapping()
//    public String getQRCode(Model model){
//        System.out.println("Inside generator");
//        String medium="https://rahul26021999.medium.com/";
//        String github="https://github.com/rahul26021999";
//
//        byte[] image = new byte[0];
//        try {
//
//            // Generate and Return Qr Code in Byte Array
//          //  image = QRCodeGeneratorService.getQRCodeImage(medium);
//
//            // Generate and Save Qr Code Image in static/image folder
//            //QRCodeGeneratorService.generateQRCodeImage(github,250,250,QR_CODE_IMAGE_PATH);
//
////        } catch (WriterException | IOException e) {
////            e.printStackTrace();
////        }
//        // Convert Byte Array into Base64 Encode String
//        String qrcode = Base64.getEncoder().encodeToString(image);
//
//        model.addAttribute("medium",medium);
//        model.addAttribute("github",github);
//        model.addAttribute("qrcode",qrcode);
//
//        return qrcode;
//    //}
//}
}