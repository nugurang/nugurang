package com.nugurang.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MatchTask {
    private final Logger logger = LoggerFactory.getLogger(MatchTask.class);

    @Scheduled(fixedDelay = 1000)
    private void scheduleTest() {
        logger.info("match task");
    }
}