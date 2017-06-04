package com.jh.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jh.app.domain.MenuAuth;

import com.jh.app.repository.MenuAuthRepository;
import com.jh.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MenuAuth.
 */
@RestController
@RequestMapping("/api")
public class MenuAuthResource {

    private final Logger log = LoggerFactory.getLogger(MenuAuthResource.class);

    private static final String ENTITY_NAME = "menuAuth";
        
    private final MenuAuthRepository menuAuthRepository;

    public MenuAuthResource(MenuAuthRepository menuAuthRepository) {
        this.menuAuthRepository = menuAuthRepository;
    }

    /**
     * POST  /menu-auths : Create a new menuAuth.
     *
     * @param menuAuth the menuAuth to create
     * @return the ResponseEntity with status 201 (Created) and with body the new menuAuth, or with status 400 (Bad Request) if the menuAuth has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/menu-auths")
    @Timed
    public ResponseEntity<MenuAuth> createMenuAuth(@RequestBody MenuAuth menuAuth) throws URISyntaxException {
        log.debug("REST request to save MenuAuth : {}", menuAuth);
        if (menuAuth.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new menuAuth cannot already have an ID")).body(null);
        }
        MenuAuth result = menuAuthRepository.save(menuAuth);
        return ResponseEntity.created(new URI("/api/menu-auths/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /menu-auths : Updates an existing menuAuth.
     *
     * @param menuAuth the menuAuth to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated menuAuth,
     * or with status 400 (Bad Request) if the menuAuth is not valid,
     * or with status 500 (Internal Server Error) if the menuAuth couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/menu-auths")
    @Timed
    public ResponseEntity<MenuAuth> updateMenuAuth(@RequestBody MenuAuth menuAuth) throws URISyntaxException {
        log.debug("REST request to update MenuAuth : {}", menuAuth);
        if (menuAuth.getId() == null) {
            return createMenuAuth(menuAuth);
        }
        MenuAuth result = menuAuthRepository.save(menuAuth);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, menuAuth.getId().toString()))
            .body(result);
    }

    /**
     * GET  /menu-auths : get all the menuAuths.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of menuAuths in body
     */
    @GetMapping("/menu-auths")
    @Timed
    public List<MenuAuth> getAllMenuAuths() {
        log.debug("REST request to get all MenuAuths");
        List<MenuAuth> menuAuths = menuAuthRepository.findAll();
        return menuAuths;
    }

    /**
     * GET  /menu-auths/:id : get the "id" menuAuth.
     *
     * @param id the id of the menuAuth to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the menuAuth, or with status 404 (Not Found)
     */
    @GetMapping("/menu-auths/{id}")
    @Timed
    public ResponseEntity<MenuAuth> getMenuAuth(@PathVariable Long id) {
        log.debug("REST request to get MenuAuth : {}", id);
        MenuAuth menuAuth = menuAuthRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(menuAuth));
    }

    /**
     * DELETE  /menu-auths/:id : delete the "id" menuAuth.
     *
     * @param id the id of the menuAuth to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/menu-auths/{id}")
    @Timed
    public ResponseEntity<Void> deleteMenuAuth(@PathVariable Long id) {
        log.debug("REST request to delete MenuAuth : {}", id);
        menuAuthRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
