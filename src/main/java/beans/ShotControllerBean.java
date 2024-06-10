package beans;

import db.DAOFactory;
import entity.Result;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;
import java.util.ArrayList;

@Data
@Slf4j
public class ShotControllerBean implements Serializable {
    private XBean xBean;
    private YBean yBean;
    private RBean rBean;

    private ArrayList<Result> results = new ArrayList<>();

    private int lastR;

    // Getter for lastR
    public int getLastR() {
        if (results != null && results.size() > 0) {
            lastR = results.get(results.size() - 1).getR();
        } else {
            lastR = 1;
        }
        return lastR;
    }
    @PostConstruct
    public void init() {
        var resultsEntities = DAOFactory.getInstance().getResultDAO().getAllShots();
        results = new ArrayList<>(resultsEntities);
        log.info("Results initialized with {} entries.", results.size());
    }

    public void addResult(Double x, Double y, Integer r) {
        Result result = Result.builder()
                .x(x)
                .y(y)
                .r(r)
                .isHit(CheckerBean.checkHit(x, y, r))
                .build();
        results.add(result);
        // add to db
        DAOFactory.getInstance().getResultDAO().addShot(result);
        log.info("Added new result to the db: X={} Y={} R={}", x, y, r);
    }


    public void clearTable() {
        results.clear();
        DAOFactory.getInstance().getResultDAO().clearShots();
        log.info("Table clear");
    }
}