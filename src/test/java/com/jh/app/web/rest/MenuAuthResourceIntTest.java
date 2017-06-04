package com.jh.app.web.rest;

import com.jh.app.JhipsterApp;

import com.jh.app.domain.MenuAuth;
import com.jh.app.repository.MenuAuthRepository;
import com.jh.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MenuAuthResource REST controller.
 *
 * @see MenuAuthResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class MenuAuthResourceIntTest {

    private static final Long DEFAULT_MENU_ID = 1L;
    private static final Long UPDATED_MENU_ID = 2L;

    private static final String DEFAULT_AUTH_NAME = "AAAAAAAAAA";
    private static final String UPDATED_AUTH_NAME = "BBBBBBBBBB";

    @Autowired
    private MenuAuthRepository menuAuthRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMenuAuthMockMvc;

    private MenuAuth menuAuth;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MenuAuthResource menuAuthResource = new MenuAuthResource(menuAuthRepository);
        this.restMenuAuthMockMvc = MockMvcBuilders.standaloneSetup(menuAuthResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MenuAuth createEntity(EntityManager em) {
        MenuAuth menuAuth = new MenuAuth()
            .menuId(DEFAULT_MENU_ID)
            .authName(DEFAULT_AUTH_NAME);
        return menuAuth;
    }

    @Before
    public void initTest() {
        menuAuth = createEntity(em);
    }

    @Test
    @Transactional
    public void createMenuAuth() throws Exception {
        int databaseSizeBeforeCreate = menuAuthRepository.findAll().size();

        // Create the MenuAuth
        restMenuAuthMockMvc.perform(post("/api/menu-auths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(menuAuth)))
            .andExpect(status().isCreated());

        // Validate the MenuAuth in the database
        List<MenuAuth> menuAuthList = menuAuthRepository.findAll();
        assertThat(menuAuthList).hasSize(databaseSizeBeforeCreate + 1);
        MenuAuth testMenuAuth = menuAuthList.get(menuAuthList.size() - 1);
        assertThat(testMenuAuth.getMenuId()).isEqualTo(DEFAULT_MENU_ID);
        assertThat(testMenuAuth.getAuthName()).isEqualTo(DEFAULT_AUTH_NAME);
    }

    @Test
    @Transactional
    public void createMenuAuthWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = menuAuthRepository.findAll().size();

        // Create the MenuAuth with an existing ID
        menuAuth.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMenuAuthMockMvc.perform(post("/api/menu-auths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(menuAuth)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<MenuAuth> menuAuthList = menuAuthRepository.findAll();
        assertThat(menuAuthList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMenuAuths() throws Exception {
        // Initialize the database
        menuAuthRepository.saveAndFlush(menuAuth);

        // Get all the menuAuthList
        restMenuAuthMockMvc.perform(get("/api/menu-auths?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(menuAuth.getId().intValue())))
            .andExpect(jsonPath("$.[*].menuId").value(hasItem(DEFAULT_MENU_ID.intValue())))
            .andExpect(jsonPath("$.[*].authName").value(hasItem(DEFAULT_AUTH_NAME.toString())));
    }

    @Test
    @Transactional
    public void getMenuAuth() throws Exception {
        // Initialize the database
        menuAuthRepository.saveAndFlush(menuAuth);

        // Get the menuAuth
        restMenuAuthMockMvc.perform(get("/api/menu-auths/{id}", menuAuth.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(menuAuth.getId().intValue()))
            .andExpect(jsonPath("$.menuId").value(DEFAULT_MENU_ID.intValue()))
            .andExpect(jsonPath("$.authName").value(DEFAULT_AUTH_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMenuAuth() throws Exception {
        // Get the menuAuth
        restMenuAuthMockMvc.perform(get("/api/menu-auths/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMenuAuth() throws Exception {
        // Initialize the database
        menuAuthRepository.saveAndFlush(menuAuth);
        int databaseSizeBeforeUpdate = menuAuthRepository.findAll().size();

        // Update the menuAuth
        MenuAuth updatedMenuAuth = menuAuthRepository.findOne(menuAuth.getId());
        updatedMenuAuth
            .menuId(UPDATED_MENU_ID)
            .authName(UPDATED_AUTH_NAME);

        restMenuAuthMockMvc.perform(put("/api/menu-auths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMenuAuth)))
            .andExpect(status().isOk());

        // Validate the MenuAuth in the database
        List<MenuAuth> menuAuthList = menuAuthRepository.findAll();
        assertThat(menuAuthList).hasSize(databaseSizeBeforeUpdate);
        MenuAuth testMenuAuth = menuAuthList.get(menuAuthList.size() - 1);
        assertThat(testMenuAuth.getMenuId()).isEqualTo(UPDATED_MENU_ID);
        assertThat(testMenuAuth.getAuthName()).isEqualTo(UPDATED_AUTH_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMenuAuth() throws Exception {
        int databaseSizeBeforeUpdate = menuAuthRepository.findAll().size();

        // Create the MenuAuth

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMenuAuthMockMvc.perform(put("/api/menu-auths")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(menuAuth)))
            .andExpect(status().isCreated());

        // Validate the MenuAuth in the database
        List<MenuAuth> menuAuthList = menuAuthRepository.findAll();
        assertThat(menuAuthList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMenuAuth() throws Exception {
        // Initialize the database
        menuAuthRepository.saveAndFlush(menuAuth);
        int databaseSizeBeforeDelete = menuAuthRepository.findAll().size();

        // Get the menuAuth
        restMenuAuthMockMvc.perform(delete("/api/menu-auths/{id}", menuAuth.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MenuAuth> menuAuthList = menuAuthRepository.findAll();
        assertThat(menuAuthList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MenuAuth.class);
    }
}
