import java.util.Date;

import static UI.UIMenu.*;

public class Main {
    public static void main(String[] args) {
        // showMenu();
        Doctor myDoctor = new Doctor("Anahi Salgado", "anahi@anahi.com");
        myDoctor.addAvailableAppointment(new Date(), "4pm");
        myDoctor.addAvailableAppointment(new Date(), "10pm");
        myDoctor.addAvailableAppointment(new Date(), "1pm");


        for (Doctor.AvailableAppointment availableAppointment : myDoctor.getAvailableAppointments()) {
            System.out.println(availableAppointment.getDate() + " " + availableAppointment.getTime());
        }

        Patient patient = new Patient("Alejandra", "alejandra@gmail.com");

        System.out.println(patient);
        System.out.println(myDoctor);
    }


}