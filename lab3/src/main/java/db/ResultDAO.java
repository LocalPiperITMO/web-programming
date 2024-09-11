package db;

import entity.Result;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.Root;

import jakarta.persistence.EntityManager;
import java.util.List;

public class ResultDAO implements AutoCloseable{
    private final EntityManager entityManager = JPAUtils.getFactory().createEntityManager();
    public void addShot(Result result){
        entityManager.getTransaction().begin();
        entityManager.persist(result);
        entityManager.getTransaction().commit();
    }
    public List<Result> getAllShots(){
        var cm = entityManager.getCriteriaBuilder().createQuery(Result.class);
        Root<Result> root = cm.from(Result.class);
        return entityManager.createQuery(cm.select(root)).getResultList();
    }
    public void clearShots(){
        entityManager.getTransaction().begin();
        try {
            Query query = entityManager.createQuery("DELETE FROM Result r");
            query.executeUpdate();
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw e;
        } finally {
            entityManager.clear();
        }
    }

    @Override
    public void close(){
        if (entityManager != null && entityManager.isOpen()) {
            entityManager.close();
        }
    }
}
