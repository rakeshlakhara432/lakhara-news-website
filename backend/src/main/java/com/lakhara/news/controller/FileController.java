package com.lakhara.news.controller;

import com.lakhara.news.dto.ApiResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    private final String UPLOAD_DIR = "./uploads/";

    @PostMapping("/upload")
    public ApiResponse<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ApiResponse.error("File is empty");
        }

        try {
            // Create directory if not exists
            Path path = Paths.get(UPLOAD_DIR);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            // Generate unique filename
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = path.resolve(fileName);
            
            // Save file
            Files.copy(file.getInputStream(), filePath);

            // Return URL (In production, this should be the full domain URL)
            String fileUrl = "http://localhost:8080/uploads/" + fileName;
            return ApiResponse.success(fileUrl, "File uploaded successfully to server");

        } catch (IOException e) {
            return ApiResponse.error("Failed to upload file: " + e.getMessage());
        }
    }
}
