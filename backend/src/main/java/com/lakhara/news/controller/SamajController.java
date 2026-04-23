package com.lakhara.news.controller;

import com.lakhara.news.dto.ApiResponse;
import com.lakhara.news.entity.Member;
import com.lakhara.news.entity.SamajEvent;
import com.lakhara.news.repository.MemberRepository;
import com.lakhara.news.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/samaj")
@CrossOrigin(origins = "*")
public class SamajController {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EventRepository eventRepository;

    // --- Members ---
    @GetMapping("/members")
    public ApiResponse<List<Member>> getAllMembers() {
        return ApiResponse.success(memberRepository.findAll(), "Members fetched successfully");
    }

    @PostMapping("/members")
    public ApiResponse<Member> addMember(@RequestBody Member member) {
        member.setApproved(false);
        return ApiResponse.success(memberRepository.save(member), "Membership application submitted");
    }

    @PutMapping("/members/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Member> approveMember(@PathVariable String id) {
        Member member = memberRepository.findById(id).orElseThrow();
        member.setApproved(true);
        return ApiResponse.success(memberRepository.save(member), "Member approved");
    }

    // --- Events ---
    @GetMapping("/events")
    public ApiResponse<List<SamajEvent>> getAllEvents() {
        return ApiResponse.success(eventRepository.findAll(), "Events fetched successfully");
    }

    @PostMapping("/events")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<SamajEvent> addEvent(@RequestBody SamajEvent event) {
        return ApiResponse.success(eventRepository.save(event), "Event created successfully");
    }

    // --- Matrimonial ---
    @Autowired
    private MatrimonialRepository matrimonialRepository;

    @GetMapping("/matrimonial")
    public ApiResponse<List<MatrimonialProfile>> getAllProfiles() {
        return ApiResponse.success(matrimonialRepository.findAll(), "Profiles fetched successfully");
    }
}
