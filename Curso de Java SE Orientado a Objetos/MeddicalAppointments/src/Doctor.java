import java.util.ArrayList;
import java.util.Date;

public class Doctor extends User {
    private String specialty;

    ArrayList<AvailableAppointment> availableAppointments = new ArrayList<>();

    public void addAvailableAppointment(Date date, String time) {
        availableAppointments.add((new AvailableAppointment(date, time)));
    }

    public ArrayList<AvailableAppointment> getAvailableAppointments() {
        return availableAppointments;
    }

    public static class AvailableAppointment {
        private Date date;
        private int id_availableAppointment;
        private String time;

        public AvailableAppointment(Date date, String time) {
            this.date = date;
            this.time = time;
        }

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }

        public int getId_availableAppointment() {
            return id_availableAppointment;
        }

        public void setId_availableAppointment(int id_availableAppointment) {
            this.id_availableAppointment = id_availableAppointment;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }
    }

    Doctor(String name, String email) {
        super(name, email);
        System.out.println("El nombre del doctor asignado es: " + name);

    }

    @Override
    public String toString() {
        return super.toString() + "\nSpeciality: " + specialty + "\nAvailable: " + availableAppointments.toString();
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }
}
