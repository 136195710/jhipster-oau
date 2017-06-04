package com.jh.app.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A MenuAuth.
 */
@Entity
@Table(name = "menu_auth")
public class MenuAuth implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "menu_id")
    private Long menuId;

    @Column(name = "auth_name")
    private String authName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMenuId() {
        return menuId;
    }

    public MenuAuth menuId(Long menuId) {
        this.menuId = menuId;
        return this;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public String getAuthName() {
        return authName;
    }

    public MenuAuth authName(String authName) {
        this.authName = authName;
        return this;
    }

    public void setAuthName(String authName) {
        this.authName = authName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MenuAuth menuAuth = (MenuAuth) o;
        if (menuAuth.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, menuAuth.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MenuAuth{" +
            "id=" + id +
            ", menuId='" + menuId + "'" +
            ", authName='" + authName + "'" +
            '}';
    }
}
