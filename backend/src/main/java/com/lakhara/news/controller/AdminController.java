package com.lakhara.news.controller;

import com.lakhara.news.dto.ApiResponse;
import com.lakhara.news.entity.Member;
import com.lakhara.news.entity.MatrimonialProfile;
import com.lakhara.news.repository.MemberRepository;
import com.lakhara.news.repository.MatrimonialRepository;
import com.lakhara.news.repository.ArticleRepository;
import com.lakhara.news.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MatrimonialRepository matrimonialRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/dashboard-stats")
    public ApiResponse<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalMembers", memberRepository.count());
        stats.put("pendingMembers", memberRepository.findAll().stream().filter(m -> !m.isApproved()).count());
        stats.put("totalArticles", articleRepository.count());
        stats.put("totalProfiles", matrimonialRepository.count());
        stats.put("totalEvents", eventRepository.count());
        return ApiResponse.success(stats, "Stats fetched successfully");
    }

    // --- Matrimonial Admin ---
    @PutMapping("/matrimonial/{id}/approve")
    public ApiResponse<MatrimonialProfile> approveProfile(@PathVariable String id) {
        MatrimonialProfile profile = matrimonialRepository.findById(id).orElseThrow();
        profile.setApproved(true);
        return ApiResponse.success(matrimonialRepository.save(profile), "Profile approved successfully");
    }

    @PutMapping("/matrimonial/{id}/verify")
    public ApiResponse<MatrimonialProfile> verifyProfile(@PathVariable String id) {
        MatrimonialProfile profile = matrimonialRepository.findById(id).orElseThrow();
        profile.setVerified(true);
        return ApiResponse.success(matrimonialRepository.save(profile), "Profile verified successfully");
    }

    @DeleteMapping("/matrimonial/{id}")
    public ApiResponse<Void> deleteProfile(@PathVariable String id) {
        matrimonialRepository.deleteById(id);
        return ApiResponse.success(null, "Profile deleted successfully");
    }

    // --- Member Admin ---
    @DeleteMapping("/members/{id}")
    public ApiResponse<Void> deleteMember(@PathVariable String id) {
        memberRepository.deleteById(id);
        return ApiResponse.success(null, "Member deleted successfully");
    }
}
