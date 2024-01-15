package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Result {
    private @Id @GeneratedValue Long id;

    private double x;
    private double y;
    private int r;

    private boolean isHit;
    private String owner;

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
