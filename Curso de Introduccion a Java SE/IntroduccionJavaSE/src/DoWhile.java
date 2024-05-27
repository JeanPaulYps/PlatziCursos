import java.util.Scanner;

public class DoWhile {
    public static void main(String[] args) {
        int response = 0;

        do {
            System.out.println("Selecciona la opcion deseada");
            System.out.println("1. peliculas");
            System.out.println("2. series");
            System.out.println("0. salir");

            Scanner sc = new Scanner(System.in);
            response = Integer.parseInt(sc.nextLine());

            switch (response) {
                case 0:
                    System.out.println("Gracias por visitarnos");
                    break;
                case 1:
                    System.out.println("Movies");
                    break;
                case 2:
                    System.out.println("Series");
                    break;
                default:
                    System.out.println("Selecciona una opción correcta");
            }

        } while(response != 0);

        System.out.println("Se termino el programa");
    }
}
