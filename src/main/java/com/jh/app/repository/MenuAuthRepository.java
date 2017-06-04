package com.jh.app.repository;

import com.jh.app.domain.MenuAuth;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the MenuAuth entity.
 */
@SuppressWarnings("unused")
public interface MenuAuthRepository extends JpaRepository<MenuAuth,Long> {

}
