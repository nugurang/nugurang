package com.nugurang.dao;

import com.nugurang.entity.EvaluationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationDao extends JpaRepository<EvaluationEntity, Long> {
}
