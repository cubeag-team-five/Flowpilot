package com.flowpilot.flowpilot.qa.service;

import com.flowpilot.flowpilot.qa.model.QABugReport;
import com.flowpilot.flowpilot.qa.repository.QABugRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QABugReportsService {

    private final QABugRepository bugRepository;

    public QABugReportsService(QABugRepository bugRepository) {
        this.bugRepository = bugRepository;
    }

    public List<QABugReport> getAllBugs() {
        return bugRepository.findAll();
    }

    public QABugReport createBug(QABugReport bug) {
        return bugRepository.save(bug);
    }
}