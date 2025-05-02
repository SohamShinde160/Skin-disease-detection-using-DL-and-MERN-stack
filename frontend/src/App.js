import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PatientSignup from "./pages/Auth/PatientSignup";
import PatientLogin from "./pages/Auth/PatientLogin";
import DoctorSignup from "./pages/Auth/DoctorSignup";
import DoctorLogin from "./pages/Auth/DoctorLogin";
import AdminLogin from "./pages/Auth/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./pages/Patient/Dashboard";
import DoctorDashboard from "./pages/Doctor/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminPatients from "./pages/Admin/Patients";
import AdminDoctors from "./pages/Admin/Doctors";
import AdminDetectionHistory from "./pages/Admin/DetectionHistory";
import AdminAppointments from "./pages/Admin/Appointments";
import MyAppointments from "./pages/Patient/MyAppointments";
import FindDermatologist from "./pages/Patient/FindDermatologist";
import BookAppointment from "./pages/Patient/BookAppointment";
import DetectionHistory from "./pages/Patient/DetectionHistory";
import EditProfile from "./pages/Patient/EditProfile";
import ConfirmAppointment from "./pages/Patient/ConfirmAppointment";
import EditDoctorProfile from "./pages/Doctor/EditProfile";
import Details from "./pages/Details";
import Team from "./pages/Team";
import AdminEntry from "./pages/AdminEntry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient-signup" element={<PatientSignup />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/disease-details" element={<Details />} />
        <Route path="/team" element={<Team />} />
        <Route path="/admin-entry" element={<AdminEntry />} />

        {/* Patient Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/find-dermatologist" element={<FindDermatologist />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/book-appointment/:doctorId" element={<ConfirmAppointment />} />
          <Route path="/detection-history" element={<DetectionHistory />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>

        {/* Doctor Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-edit-profile" element={<EditDoctorProfile />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-patients" element={<AdminPatients />} />
          <Route path="/admin-doctors" element={<AdminDoctors />} />
          <Route path="/admin-detection-history" element={<AdminDetectionHistory />} />
          <Route path="/admin-appointments" element={<AdminAppointments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
