public class SwitchStatement {
    public static void main(String[] args) {
        String colorModeSelected = "Light";

        switch (colorModeSelected) {
            case "Light":
                System.out.println("Seleccionaste Light");
                break;
            case "Night":
                System.out.println("Seleccionaste dark mode");
                break;
            default:
                System.out.println("Selecciona una opcion correcta");
        }
    }
}
