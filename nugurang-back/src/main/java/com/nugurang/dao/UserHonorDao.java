package com.nugurang.dao;

import com.nugurang.entity.UserHonorEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserHonorDao extends JpaRepository<UserHonorEntity, Long> {

    List<UserHonorEntity> findAllByUserId(Long user);

    Optional<UserHonorEntity> findByUserIdAndPositionId(Long user, Long position);
}
