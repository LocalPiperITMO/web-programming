package beans;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.ValidatorException;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class XBean implements Serializable {
    private Double x = 0.0;

    public List<Double> getAvailableXValues() {
        List<Double> availableXValues = new ArrayList<>();
        availableXValues.add(-3.0);
        availableXValues.add(-2.0);
        availableXValues.add(-1.0);
        availableXValues.add(0.0);
        availableXValues.add(1.0);
        availableXValues.add(2.0);
        availableXValues.add(3.0);
        availableXValues.add(4.0);
        availableXValues.add(5.0);

        return availableXValues;
    }

    public void validateXBeanValue(FacesContext facesContext,
                                   UIComponent uiComponent, Object o){
        if (o == null){
            FacesMessage message = new FacesMessage("Input X!");
            throw new ValidatorException(message);
        }
    }
}
