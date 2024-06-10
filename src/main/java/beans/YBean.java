package beans;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.ValidatorException;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
public class YBean implements Serializable {
    private Double y = 0.0;

    public void validateYBeanValue(FacesContext facesContext,
                                   UIComponent uiComponent, Object o){
        if (o == null){
            FacesMessage message = new FacesMessage("Input Y!");
            throw new ValidatorException(message);
        }
    }
}
