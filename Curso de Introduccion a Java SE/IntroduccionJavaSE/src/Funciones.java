public class Funciones {

    public static void main(String[] args) {
        double y =3;
        System.out.println(circleArea(y));
        System.out.println(sphereArea(y));
    }
    public static double circleArea (double radio) {
        return Math.PI  * Math.pow(radio, 2);
    }

    public static double sphereArea (double radio) {
        return 4 * Math.PI  * Math.pow(radio, 2);
    }

    /**
     * Descripcion: Convierte una cantidad de dinero a dolares
     * @param quantity Cantidad de dinero
     * @param currency Tipo de moneda: solo acepta MXN o COP
     * @return Devuelve la cantidad actualizada en dolares
     */
    public static double convertToDolar (double quantity, String currency) {
        switch (currency) {
            case "MXN":
                quantity = quantity * 0.052;
                break;
            case "COP":
                quantity = quantity * 0.0031;
                break;
        }
        return quantity;
    }
}
