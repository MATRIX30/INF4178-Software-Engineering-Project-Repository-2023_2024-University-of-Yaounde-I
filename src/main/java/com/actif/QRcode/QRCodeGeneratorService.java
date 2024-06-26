package com.actif.QRcode;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service
public class QRCodeGeneratorService {
    @Value("${file.qrcode.path}")
    private  String QR_CODE_IMAGE_PATH;
    //private static final String QR_CODE_IMAGE_PATH = "./src/main/resources/static/img/";

    @Value("${file.qrcode.width}")
    private   int WIDTH;

    @Value("${file.qrcode.height}")
    private   int HEIGHT;



    public  void generateQRCodeImage(String text, String filename)
            throws WriterException, IOException {
//        QRCodeWriter qrCodeWriter = new QRCodeWriter();
//        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, WIDTH, HEIGHT);
//        Path path = FileSystems.getDefault().getPath(QR_CODE_IMAGE_PATH+filename);
//        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);


    }

    public byte[] getQRCodeImage(String text) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, WIDTH, HEIGHT);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageConfig con = new MatrixToImageConfig( 0xFF000002 , 0xFFFFC041 ) ;

        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream,con);
        byte[] pngData = pngOutputStream.toByteArray();
        return pngData;
    }
}
