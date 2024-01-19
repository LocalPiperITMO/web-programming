package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "results", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Result {
    private @Id @GeneratedValue Long id;

    @Column(nullable = false)
    private double x;

    @Column(nullable = false)
    private double y;

    @Column(nullable = false)
    private long r;

    @Column(nullable = false)
    private boolean isHit;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Auth owner;

    public Result(double x, double y, long r, boolean isHit, Auth owner) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "{" +
                "\"id\":" + "\"" + id + "\"" + "," +
                "\"x\":" + "\"" + x + "\"" + "," +
                "\"y\":" + "\"" + y + "\"" + "," +
                "\"r\":" + "\"" + r + "\"" + "," +
                "\"isHit\":" + "\"" + isHit + "\"" + "," +
                "\"owner\":" + "\"" + owner + "\"" +
                '}';
    }
}
