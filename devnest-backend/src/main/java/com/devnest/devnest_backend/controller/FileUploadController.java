// src/controller/FileUploadController.java

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
public class FileUploadController {

    @Value("${upload.dir}")
    private String uploadDir;  // The directory where the files will be uploaded

    @PostMapping("/code")
    public String uploadCodeProject(@RequestParam("file") MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        File targetFile = new File(uploadDir, fileName);
        file.transferTo(targetFile);
        return "File uploaded successfully: " + targetFile.getAbsolutePath();
    }
}
