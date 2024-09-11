package entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name="results", schema = "public")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name="sequence-generator", sequenceName = "results_id_seq", allocationSize = 1)
    protected Long id;

    private double x;
    private double y;
    private int r;

    private boolean isHit;
}
