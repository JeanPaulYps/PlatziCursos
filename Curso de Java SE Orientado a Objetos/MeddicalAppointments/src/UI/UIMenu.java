package UI;

import Models.Doctor;
import Models.Patient;

import java.util.ArrayList;
import java.util.Scanner;

public class UIMenu {

    public static final String[] months = {
            "Enero", "Febrero", "Marzo", "Abril",
            "Mayo", "Junio", "Julio", "Agosto",
            "Septiembre", "Octubre", "Noviembre", "Diciembre"
    };

    public static Doctor doctorLogged;
    public static Patient patientLogged;

    public static void showMenu() {
        System.out.println("Welcome to My Appointments");
        System.out.println("Selecciona la opción deseada");

        int response = 0;
        do {
            System.out.println("1. Doctor");
            System.out.println("2. Patient");
            System.out.println("0. Salir");

            Scanner sc = new Scanner(System.in);
            response = Integer.valueOf(sc.nextLine());

            switch (response) {
                case 1:
                    System.out.println("Doctor");
                    authUser(1);
                    break;
                case 2:
                    response = 0;
                    authUser(2);
                    showPatientMenu();

                    break;
                case 0:
                    System.out.println("Thank you for you visit");
                    break;
                default:
                    System.out.println("Please select a correct answer");
            }
        } while (response != 0);
    }

    public static void showPatientMenu() {
        int response = 0;
        do {
            System.out.println("\n\n");
            System.out.println("Patient");
            System.out.println("1. Book an appointment");
            System.out.println("2. My appointments");
            System.out.println("0. Return");

            Scanner sc = new Scanner(System.in);
            response = Integer.valueOf(sc.nextLine());

            switch (response) {
                case 1:
                    System.out.println("::Book an appointment");
                    break;
                case 2:
                    System.out.println("::My appointments");
                    break;
                case 0:
                    showMenu();
                    break;
            }
        } while (response != 0);
    }

    private static void authUser(int userType) {
        //Models.User Type 1 -> Models.Doctor | Models.User Type 2 -> Models.Patient
        ArrayList<Doctor> doctors = new ArrayList<Doctor>();
        doctors.add(new Doctor("Alejandro Martinez", "alejandro@mail.com"));
        doctors.add(new Doctor("Karen Sosa", "kare@mail.com"));
        doctors.add(new Doctor("Rocío Gómez", "rocio@mail.com"));

        ArrayList<Patient> patients = new ArrayList<Patient>();
        patients.add(new Patient("Anahi Salgado", "anahi@mail.com"));
        patients.add(new Patient("Roberto Rodríguez", "roberto@mail.com"));
        patients.add(new Patient("Carlos Sanchez", "carlos@mail.com"));

        boolean emailCorrect = false;
        do {
            System.out.println("Insert your email: [q@a.com");
            Scanner sc = new Scanner(System.in);
            String email = sc.nextLine();

            if (userType == 1) {
                for (Doctor doctor : doctors) {
                    if (doctor.getEmail().equals(email)) {
                        emailCorrect = true;
                        doctorLogged = doctor;
                        UIDoctorMenu.showDoctorMenu();
                        break;
                    }
                }
            }

            if (userType == 2) {
                for (Patient patient : patients) {
                    if (patient.getEmail().equals(email)) {
                        emailCorrect = true;
                        patientLogged = patient;
                        UIPatientMenu.showPatientMenu();
                        break;
                    }
                }
            }
        } while (!emailCorrect);


    }
}
