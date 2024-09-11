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
public class RBean implements Serializable {
    private Integer r = 1;

    public void validateRBeanValue(FacesContext facesContext,
                                   UIComponent uiComponent, Object o){
        if (o == null){
            FacesMessage message = new FacesMessage("Input R!");
            throw new ValidatorException(message);
        }
    }
}
