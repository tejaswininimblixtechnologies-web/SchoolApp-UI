import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Calendar,
  GraduationCap,
  Clock,
  BookOpen,
  CreditCard,
  Bell,
  Menu,
  LogOut,
  Upload,
  Download,
  Edit,
  User,
  X,
  Camera,
  Trash2,
} from 'lucide-react';
import { getCurrentUser } from '../utils/auth';

const StudentDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Assignment Due Reminder',
      description: 'Your History essay is due tomorrow. Please submit it before the deadline.',
      dateTime: '2024-05-20 09:00',
      category: 'Assignment',
      read: false,
    },
    {
      id: 2,
      title: 'Grade Updated',
      description: 'Your Science quiz grade has been updated to 92%.',
      dateTime: '2024-05-19 14:30',
      category: 'Grade',
      read: true,
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for May 28, 2024 at 10:00 AM.',
      dateTime: '2024-05-18 11:15',
      category: 'Meeting',
      read: true,
    },
    {
      id: 4,
      title: 'Fee Payment Due',
      description: 'Your fee payment of $50 is due by May 30, 2024.',
      dateTime: '2024-05-17 08:00',
      category: 'Fee',
      read: false,
    },
    {
      id: 5,
      title: 'School Holiday Notice',
      description: 'School will remain closed on May 26, 2024 due to public holiday.',
      dateTime: '2024-05-16 16:45',
      category: 'Notice',
      read: true,
    },
  ]);

  const [studentData, setStudentData] = useState({
    name: 'Alex Johnson',
    rollNumber: 'STU001',
    class: 'Grade 10',
    section: 'A',
    dob: '2008-05-15',
    parentName: 'John Johnson',
    parentContact: '+1-234-567-8900',
    email: 'alex.johnson@school.edu',
    address: '123 Main Street, City, State 12345',
    profileImage: null,
  });

  useEffect(() => {
    const fetchStudentData = () => {
      // Try to get name from direct storage (set during signup)
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setStudentData(prevData => ({ ...prevData, name: storedName }));
      }

      // Fallback: Try to get from registeredUsers object
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (registeredUsers.student && registeredUsers.student.firstName) {
          setStudentData(prevData => ({
            ...prevData,
            name: `${registeredUsers.student.firstName} ${registeredUsers.student.lastName}`,
            rollNumber: registeredUsers.student.rollNumber || prevData.rollNumber,
            class: registeredUsers.student.className || prevData.class,
            section: registeredUsers.student.section || prevData.section,
            email: registeredUsers.student.email || prevData.email,
            profileImage: registeredUsers.student.profileImage || prevData.profileImage,
          }));
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }

      // Also try currentUser as backup
      const currentUser = getCurrentUser();
      if (currentUser && !storedName) {
        setStudentData(prevData => ({
          ...prevData,
          name: currentUser.name || prevData.name,
          rollNumber: currentUser.rollNumber || prevData.rollNumber,
          class: currentUser.class || prevData.class,
          section: currentUser.section || prevData.section,
          email: currentUser.email || prevData.email,
        }));
      }
    };

    fetchStudentData();
  }, []);

  // Mock data for dashboard
  const dashboardData = {
    attendancePercentage: 95,
    upcomingExam: 'Mathematics Final Exam - May 25, 2024',
    pendingAssignments: 3,
    feeDue: '$50.00',
    recentNotifications: [
      { id: 1, title: 'Assignment Due', message: 'History essay due tomorrow', date: '2024-05-20', read: false },
      { id: 2, title: 'Grade Updated', message: 'Science quiz grade: 92%', date: '2024-05-19', read: true },
      { id: 3, title: 'Parent Meeting', message: 'PTM scheduled for next week', date: '2024-05-18', read: true },
    ],
  };

  // Mock data for attendance
  const attendanceData = {
    totalWorkingDays: 180,
    daysPresent: 171,
    daysAbsent: 9,
    percentage: 95,
    monthlyData: [
      { month: 'Jan', present: 22, absent: 1 },
      { month: 'Feb', present: 20, absent: 2 },
      { month: 'Mar', present: 23, absent: 0 },
      { month: 'Apr', present: 21, absent: 2 },
      { month: 'May', present: 18, absent: 3 },
    ],
    dateWiseStatus: [
      { date: '2024-05-01', status: 'Present' },
      { date: '2024-05-02', status: 'Present' },
      { date: '2024-05-03', status: 'Absent' },
      { date: '2024-05-04', status: 'Present' },
      { date: '2024-05-05', status: 'Leave' },
    ],
  };

  // Mock data for marks/results
  const marksData = [
    {
      examName: 'Unit Test 1',
      subjects: [
        { name: 'Mathematics', marks: 85, total: 100, percentage: 85, grade: 'A', status: 'Pass' },
        { name: 'Science', marks: 92, total: 100, percentage: 92, grade: 'A+', status: 'Pass' },
        { name: 'English', marks: 78, total: 100, percentage: 78, grade: 'B+', status: 'Pass' },
        { name: 'History', marks: 88, total: 100, percentage: 88, grade: 'A', status: 'Pass' },
      ],
      totalMarks: 343,
      maxMarks: 400,
      percentage: 85.75,
      grade: 'A',
      status: 'Pass',
      teacherRemarks: 'Excellent performance. Keep it up!',
    },
    {
      examName: 'Mid-term Exam',
      subjects: [
        { name: 'Mathematics', marks: 90, total: 100, percentage: 90, grade: 'A+', status: 'Pass' },
        { name: 'Science', marks: 87, total: 100, percentage: 87, grade: 'A', status: 'Pass' },
        { name: 'English', marks: 82, total: 100, percentage: 82, grade: 'A-', status: 'Pass' },
        { name: 'History', marks: 91, total: 100, percentage: 91, grade: 'A+', status: 'Pass' },
      ],
      totalMarks: 350,
      maxMarks: 400,
      percentage: 87.5,
      grade: 'A',
      status: 'Pass',
      teacherRemarks: 'Consistent improvement shown.',
    },
  ];

  // Mock data for timetable
  const timetableData = {
    Monday: [
      { time: '08:00-09:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '09:00-10:00', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'English', teacher: 'Mrs. Davis', room: 'Room 102' },
      { time: '11:15-12:15', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 103' },
    ],
    Tuesday: [
      { time: '08:00-09:00', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
      { time: '09:00-10:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'Geography', teacher: 'Ms. Brown', room: 'Room 104' },
      { time: '11:15-12:15', subject: 'Art', teacher: 'Mr. Lee', room: 'Art Room' },
    ],
    Wednesday: [
      { time: '08:00-09:00', subject: 'English', teacher: 'Mrs. Davis', room: 'Room 102' },
      { time: '09:00-10:00', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 103' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '11:15-12:15', subject: 'Physical Education', teacher: 'Mr. Taylor', room: 'Gym' },
    ],
    Thursday: [
      { time: '08:00-09:00', subject: 'History', teacher: 'Mr. Wilson', room: 'Room 103' },
      { time: '09:00-10:00', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'English', teacher: 'Mrs. Davis', room: 'Room 102' },
      { time: '11:15-12:15', subject: 'Computer Science', teacher: 'Ms. Chen', room: 'Computer Lab' },
    ],
    Friday: [
      { time: '08:00-09:00', subject: 'Geography', teacher: 'Ms. Brown', room: 'Room 104' },
      { time: '09:00-10:00', subject: 'Art', teacher: 'Mr. Lee', room: 'Art Room' },
      { time: '10:00-10:15', subject: 'Break', teacher: '', room: '' },
      { time: '10:15-11:15', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '11:15-12:15', subject: 'Science', teacher: 'Ms. Johnson', room: 'Lab 1' },
    ],
  };

  // Mock data for assignments
  const [assignmentsData, setAssignmentsData] = useState([
    {
      id: 1,
      title: 'History Essay: World War II',
      subject: 'History',
      assignedDate: '2024-05-15',
      dueDate: '2024-05-25',
      status: 'Pending',
      feedback: '',
    },
    {
      id: 2,
      title: 'Math Problem Set 5',
      subject: 'Mathematics',
      assignedDate: '2024-05-10',
      dueDate: '2024-05-22',
      status: 'Submitted',
      feedback: 'Well done! All problems solved correctly.',
    },
    {
      id: 3,
      title: 'Science Experiment Report',
      subject: 'Science',
      assignedDate: '2024-05-12',
      dueDate: '2024-05-20',
      status: 'Overdue',
      feedback: '',
    },
  ]);

  // Mock data for fee & payments
  const feeData = {
    totalFee: 1200.00,
    paidAmount: 1150.00,
    pendingAmount: 50.00,
    dueDate: '2024-05-30',
    status: 'Partial',
    paymentHistory: [
      { date: '2024-01-15', amount: 300.00, method: 'Online', receipt: 'REC001' },
      { date: '2024-02-15', amount: 300.00, method: 'Cash', receipt: 'REC002' },
      { date: '2024-03-15', amount: 300.00, method: 'Online', receipt: 'REC003' },
      { date: '2024-04-15', amount: 250.00, method: 'Online', receipt: 'REC004' },
    ],
  };

  // Mock data for notifications
  const notificationsData = [
    {
      id: 1,
      title: 'Assignment Due Reminder',
      description: 'Your History essay is due tomorrow. Please submit it before the deadline.',
      dateTime: '2024-05-20 09:00',
      category: 'Assignment',
      read: false,
    },
    {
      id: 2,
      title: 'Grade Updated',
      description: 'Your Science quiz grade has been updated to 92%.',
      dateTime: '2024-05-19 14:30',
      category: 'Grade',
      read: true,
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for May 28, 2024 at 10:00 AM.',
      dateTime: '2024-05-18 11:15',
      category: 'Meeting',
      read: true,
    },
    {
      id: 4,
      title: 'Fee Payment Due',
      description: 'Your fee payment of $50 is due by May 30, 2024.',
      dateTime: '2024-05-17 08:00',
      category: 'Fee',
      read: false,
    },
    {
      id: 5,
      title: 'School Holiday Notice',
      description: 'School will remain closed on May 26, 2024 due to public holiday.',
      dateTime: '2024-05-16 16:45',
      category: 'Notice',
      read: true,
    },
  ];

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: Home },
    { id: 'Attendance', label: 'Attendance', icon: Calendar },
    { id: 'Marks/Results', label: 'Marks/Results', icon: GraduationCap },
    { id: 'Timetable', label: 'Timetable', icon: Clock },
    { id: 'Assignments', label: 'Assignments', icon: BookOpen },
    { id: 'Fee & Payments', label: 'Fee & Payments', icon: CreditCard },
    { id: 'Announcements', label: 'Announcements', icon: Bell },
    { id: 'Calendar', label: 'Calendar', icon: Clock },
    { id: 'Reports', label: 'Reports', icon: GraduationCap },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleAssignmentUpload = (assignmentId) => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Update assignment status to "Submitted"
        setAssignmentsData(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.id === assignmentId
              ? { ...assignment, status: 'Submitted' }
              : assignment
          )
        );
        alert(`Assignment "${file.name}" uploaded successfully! Status updated to Submitted.`);
      }
    };
    input.click();
  };

  const handleDownloadReceipt = (receiptId) => {
    // Mock download functionality - create a simple text file
    const element = document.createElement('a');
    const file = new Blob([`Receipt ID: ${receiptId}\nAmount: $300.00\nDate: 2024-01-15\nMethod: Online\nStatus: Paid`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `receipt_${receiptId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleUpdateProfile = () => {
    // Mock update functionality
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentData(prevData => ({
          ...prevData,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setStudentData(prevData => ({
      ...prevData,
      profileImage: null
    }));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {studentData.name}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Class & Section</p>
            <p className="text-xl font-bold text-blue-600">{studentData.class} - {studentData.section}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Roll Number</p>
            <p className="text-xl font-bold text-green-600">{studentData.rollNumber}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Attendance %</p>
            <p className="text-xl font-bold text-purple-600">{dashboardData.attendancePercentage}%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Pending Assignments</p>
            <p className="text-xl font-bold text-orange-600">{dashboardData.pendingAssignments}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Upcoming Exam</p>
            <p className="font-semibold text-yellow-800">{dashboardData.upcomingExam}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Fee Due</p>
            <p className="font-semibold text-red-800">{dashboardData.feeDue}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Trend</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Jan</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Feb</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mar</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <span className="text-sm">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Apr</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '96%' }}></div>
              </div>
              <span className="text-sm">96%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">May</span>
              <div className="w-32 bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <span className="text-sm">94%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Marks Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mathematics</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium">85/100</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Science</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm font-medium">92/100</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">English</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-sm font-medium">78/100</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">History</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <span className="text-sm font-medium">88/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          {dashboardData.recentNotifications.map(notification => (
            <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${notification.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                </div>
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">15</p>
            <p className="text-sm text-gray-600">Total Subjects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-600">Exams This Year</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">4.5</p>
            <p className="text-sm text-gray-600">Average GPA</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Total Working Days</p>
          <p className="text-2xl font-bold text-gray-900">{attendanceData.totalWorkingDays}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Days Present</p>
          <p className="text-2xl font-bold text-green-600">{attendanceData.daysPresent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Days Absent</p>
          <p className="text-2xl font-bold text-red-600">{attendanceData.daysAbsent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Attendance %</p>
          <p className="text-2xl font-bold text-blue-600">{attendanceData.percentage}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Attendance Trend</h3>
          <div className="space-y-3">
            {attendanceData.monthlyData.map(month => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{month.month}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-4">
                    <div className="bg-green-600 h-4 rounded-full" style={{ width: `${(month.present / (month.present + month.absent)) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{Math.round((month.present / (month.present + month.absent)) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-900">Best Month</p>
                <p className="text-xs text-green-700">March - 98% attendance</p>
              </div>
              <div className="text-2xl">📈</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-900">Improvement Needed</p>
                <p className="text-xs text-yellow-700">May - 94% attendance</p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900">Current Streak</p>
                <p className="text-xs text-blue-700">12 consecutive days present</p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Attendance Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Subject</th>
                <th className="text-left py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.dateWiseStatus.slice(0, 10).map((record, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 font-medium">{record.date}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      record.status === 'Present' ? 'bg-green-100 text-green-800' :
                      record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-2">All Subjects</td>
                  <td className="py-2 text-sm text-gray-600">
                    {record.status === 'Present' ? 'Attended all classes' :
                     record.status === 'Absent' ? 'Medical leave' :
                     'Late arrival'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">95%</p>
            <p className="text-sm text-blue-800">Current Goal</p>
            <p className="text-xs text-blue-600 mt-1">Achieved ✅</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">98%</p>
            <p className="text-sm text-green-800">Next Target</p>
            <p className="text-xs text-green-600 mt-1">Keep it up!</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">100%</p>
            <p className="text-sm text-purple-800">Perfect Attendance</p>
            <p className="text-xs text-purple-600 mt-1">Challenge yourself</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarksResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Overall Grade</p>
          <p className="text-3xl font-bold text-green-600">A</p>
          <p className="text-xs text-gray-500">Grade 10 Average</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Average Percentage</p>
          <p className="text-3xl font-bold text-blue-600">87.5%</p>
          <p className="text-xs text-gray-500">This Year</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Subjects Passed</p>
          <p className="text-3xl font-bold text-purple-600">15/15</p>
          <p className="text-xs text-gray-500">All Subjects</p>
        </div>
      </div>

      {marksData.map((exam, examIndex) => (
        <div key={examIndex} className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{exam.examName}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h4>
              <div className="space-y-3">
                {exam.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{subject.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${subject.percentage}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{subject.marks}/{subject.total}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subject.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">A Grade</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs font-medium">3 subjects</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">A- Grade</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-xs font-medium">1 subject</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">B+ Grade</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <span className="text-xs font-medium">0 subjects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Subject</th>
                  <th className="text-center py-2">Marks</th>
                  <th className="text-center py-2">Total</th>
                  <th className="text-center py-2">Percentage</th>
                  <th className="text-center py-2">Grade</th>
                  <th className="text-center py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {exam.subjects.map((subject, subjectIndex) => (
                  <tr key={subjectIndex} className="border-b">
                    <td className="py-2 font-medium">{subject.name}</td>
                    <td className="py-2 text-center">{subject.marks}</td>
                    <td className="py-2 text-center">{subject.total}</td>
                    <td className="py-2 text-center">{subject.percentage}%</td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${
                        subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${
                        subject.status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {subject.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Marks</p>
              <p className="text-xl font-bold text-gray-900">{exam.totalMarks}/{exam.maxMarks}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Percentage</p>
              <p className="text-xl font-bold text-blue-600">{exam.percentage}%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Grade</p>
              <p className="text-xl font-bold text-green-600">{exam.grade}</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Teacher Remarks</p>
            <p className="text-gray-800">{exam.teacherRemarks}</p>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Improvement</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mathematics</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm">↗️ +5%</span>
                  <span className="text-sm font-medium">85% → 90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Science</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm">↗️ +3%</span>
                  <span className="text-sm font-medium">89% → 92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">English</span>
                <div className="flex items-center gap-2">
                  <span className="text-red-600 text-sm">↘️ -2%</span>
                  <span className="text-sm font-medium">80% → 78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">History</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm">↗️ +7%</span>
                  <span className="text-sm font-medium">81% → 88%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Exam-wise Comparison</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Unit Test 1</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium">85.75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mid-term Exam</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '87.5%' }}></div>
                  </div>
                  <span className="text-sm font-medium">87.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Final Exam</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-600 h-3 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-sm font-medium">90% (Predicted)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimetable = () => {
    const days = Object.keys(timetableData);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Timetable</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedDay === day ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {timetableData[selectedDay].map((slot, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                slot.subject === 'Break' ? 'bg-gray-50 border-gray-300' : 'bg-white border-blue-500'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{slot.subject}</p>
                    {slot.subject !== 'Break' && (
                      <p className="text-sm text-gray-600">Teacher: {slot.teacher}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{slot.time}</p>
                    {slot.room && <p className="text-sm text-gray-600">{slot.room}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAssignments = () => (
    <div className="space-y-6">
      {assignmentsData.map(assignment => (
        <div key={assignment.id} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{assignment.title}</h3>
              <p className="text-gray-600">Subject: {assignment.subject}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              assignment.status === 'Submitted' ? 'bg-green-100 text-green-800' :
              assignment.status === 'Overdue' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {assignment.status}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Assigned Date</p>
              <p className="font-medium">{assignment.assignedDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Due Date</p>
              <p className={`font-medium ${assignment.status === 'Overdue' ? 'text-red-600' : ''}`}>
                {assignment.dueDate}
              </p>
            </div>
          </div>
          {assignment.status === 'Submitted' && assignment.feedback && (
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">Teacher Feedback</p>
              <p className="text-gray-800">{assignment.feedback}</p>
            </div>
          )}
          {assignment.status !== 'Submitted' && (
            <button
              onClick={() => handleAssignmentUpload(assignment.id)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={16} />
              Upload Assignment
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderFeePayments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Total Fee</p>
          <p className="text-2xl font-bold text-gray-900">${feeData.totalFee}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Paid Amount</p>
          <p className="text-2xl font-bold text-green-600">${feeData.paidAmount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Pending Amount</p>
          <p className="text-2xl font-bold text-red-600">${feeData.pendingAmount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-600">Due Date</p>
          <p className="text-lg font-bold text-orange-600">{feeData.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Distribution</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="96, 4"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeDasharray="4, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">96%</p>
                  <p className="text-sm text-gray-600">Paid</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Paid Amount</span>
              </div>
              <span className="text-sm font-medium">$1150 (96%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Pending Amount</span>
              </div>
              <span className="text-sm font-medium">$50 (4%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Trend</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Jan</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-xs">$300</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Feb</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-xs">$300</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mar</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-xs">$300</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Apr</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <span className="text-xs">$250</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">May</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="text-xs">$0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Method</th>
                <th className="text-left py-2">Receipt</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeData.paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{payment.date}</td>
                  <td className="py-2">${payment.amount}</td>
                  <td className="py-2">{payment.method}</td>
                  <td className="py-2">{payment.receipt}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleDownloadReceipt(payment.receipt)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fee Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">$400</p>
            <p className="text-sm text-blue-800">Tuition Fee</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">$300</p>
            <p className="text-sm text-green-800">Transportation</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">$250</p>
            <p className="text-sm text-purple-800">Books & Materials</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">$250</p>
            <p className="text-sm text-orange-800">Other Fees</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {notificationsData.map(notification => (
        <div key={notification.id} className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${
          notification.read ? 'border-gray-300' : 'border-blue-500'
        }`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900">{notification.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                notification.category === 'Assignment' ? 'bg-blue-100 text-blue-800' :
                notification.category === 'Grade' ? 'bg-green-100 text-green-800' :
                notification.category === 'Meeting' ? 'bg-purple-100 text-purple-800' :
                notification.category === 'Fee' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {notification.category}
              </span>
              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
            </div>
          </div>
          <p className="text-gray-700 mb-2">{notification.description}</p>
          <p className="text-sm text-gray-500">{notification.dateTime}</p>
        </div>
      ))}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">School Announcements</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-900">Parent-Teacher Meeting</h4>
            <p className="text-blue-800 mt-1">Scheduled for May 28, 2024 at 10:00 AM in the auditorium.</p>
            <p className="text-sm text-blue-600 mt-2">Posted: May 18, 2024</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-900">Sports Day</h4>
            <p className="text-green-800 mt-1">Annual sports day will be held on June 5, 2024. All students must participate.</p>
            <p className="text-sm text-green-600 mt-2">Posted: May 15, 2024</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-900">Exam Schedule Update</h4>
            <p className="text-yellow-800 mt-1">Final exams will start from May 30, 2024. Check the timetable for details.</p>
            <p className="text-sm text-yellow-600 mt-2">Posted: May 12, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Calendar - May 2024</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div>
                <h4 className="font-semibold text-red-900">May 15, 2024</h4>
                <p className="text-red-800 text-sm">Unit Test 1 - All Subjects</p>
              </div>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Exam</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div>
                <h4 className="font-semibold text-blue-900">May 20, 2024</h4>
                <p className="text-blue-800 text-sm">Assignment Submission Deadline</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Assignment</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div>
                <h4 className="font-semibold text-green-900">May 25, 2024</h4>
                <p className="text-green-800 text-sm">Mathematics Final Exam</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Exam</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div>
                <h4 className="font-semibold text-purple-900">May 28, 2024</h4>
                <p className="text-purple-800 text-sm">Parent-Teacher Meeting</p>
              </div>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Meeting</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div>
                <h4 className="font-semibold text-orange-900">May 30, 2024</h4>
                <p className="text-orange-800 text-sm">School Holiday - Public Holiday</p>
              </div>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Holiday</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Calendar - June 2024</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <div>
                <h4 className="font-semibold text-indigo-900">June 1, 2024</h4>
                <p className="text-indigo-800 text-sm">Science Practical Exam</p>
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">Exam</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <div>
                <h4 className="font-semibold text-pink-900">June 5, 2024</h4>
                <p className="text-pink-800 text-sm">Annual Sports Day</p>
              </div>
              <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">Event</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <div>
                <h4 className="font-semibold text-teal-900">June 10, 2024</h4>
                <p className="text-teal-800 text-sm">Mid-term Break Begins</p>
              </div>
              <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">Holiday</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div>
                <h4 className="font-semibold text-yellow-900">June 15, 2024</h4>
                <p className="text-yellow-800 text-sm">School Picnic</p>
              </div>

              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Event</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-gray-500">
              <div>
                <h4 className="font-semibold text-gray-900">June 20, 2024</h4>
                <p className="text-gray-800 text-sm">Classes Resume</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Academic</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">3</p>
            <p className="text-sm text-red-800">Exams This Month</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-sm text-blue-800">Assignments Due</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-sm text-green-800">PTM Scheduled</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">2</p>
            <p className="text-sm text-purple-800">School Events</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Important Dates</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold text-gray-900">Term End</h4>
            <p className="text-gray-600 text-sm">June 30, 2024 - All final exams completed</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">Result Declaration</h4>
            <p className="text-gray-600 text-sm">July 15, 2024 - Report cards distributed</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">New Term Begins</h4>
            <p className="text-gray-600 text-sm">August 1, 2024 - Classes resume for new academic year</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Academic Performance Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Academic Performance Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">A</p>
            <p className="text-sm text-blue-800">Overall Grade</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">87.5%</p>
            <p className="text-sm text-green-800">Average Score</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">4.2</p>
            <p className="text-sm text-purple-800">GPA</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">15/15</p>
            <p className="text-sm text-orange-800">Subjects Passed</p>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Performance</h3>
        <div className="space-y-3">
          {marksData[0].subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">{subject.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${subject.percentage}%` }}></div>
                </div>
                <span className="text-sm font-medium">{subject.marks}/{subject.total}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                  subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {subject.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{attendanceData.daysPresent}</p>
            <p className="text-sm text-green-800">Days Present</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{attendanceData.daysAbsent}</p>
            <p className="text-sm text-red-800">Days Absent</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{attendanceData.percentage}%</p>
            <p className="text-sm text-blue-800">Overall Percentage</p>
          </div>
        </div>
      </div>

      {/* Fee Payment Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fee Payment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">${feeData.paidAmount}</p>
            <p className="text-sm text-green-800">Paid Amount</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">${feeData.pendingAmount}</p>
            <p className="text-sm text-red-800">Pending Amount</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">{feeData.status}</p>
            <p className="text-sm text-blue-800">Payment Status</p>
          </div>
        </div>
      </div>

      {/* Assignments Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Assignments Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{assignmentsData.filter(a => a.status === 'Submitted').length}</p>
            <p className="text-sm text-blue-800">Submitted</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{assignmentsData.filter(a => a.status === 'Pending').length}</p>
            <p className="text-sm text-yellow-800">Pending</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{assignmentsData.filter(a => a.status === 'Overdue').length}</p>
            <p className="text-sm text-red-800">Overdue</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-blue-900">Assignment Submitted</p>
              <p className="text-xs text-blue-700">History Essay submitted on May 20, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-green-900">Grade Updated</p>
              <p className="text-xs text-green-700">Science quiz grade updated to 92%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-purple-900">Fee Payment</p>
              <p className="text-xs text-purple-700">$300 fee payment made on April 15, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative group">
            <img
              src={studentData.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name)}&background=c7d2fe&color=3730a3&size=128`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full hover:bg-indigo-700 transition-colors shadow-sm border-2 border-white"
              title="Upload Photo"
            >
              <Camera size={14} />
            </button>
            {studentData.profileImage && (
              <button
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-sm border-2 border-white"
                title="Remove Photo"
              >
                <Trash2 size={14} />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{studentData.name}</h2>
            <p className="text-gray-600">{studentData.class} - {studentData.section} | Roll: {studentData.rollNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={studentData.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              defaultValue={studentData.rollNumber}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <input
              type="text"
              defaultValue={studentData.class}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <input
              type="text"
              defaultValue={studentData.section}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              defaultValue={studentData.dob}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={studentData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              defaultValue={studentData.address}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Parent Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
              <input
                type="text"
                defaultValue={studentData.parentName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Contact</label>
              <input
                type="tel"
                defaultValue={studentData.parentContact}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdateProfile}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} />
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );

const renderContent = () => {
  switch (activeSection) {
    case 'Dashboard':
      return renderDashboard();
    case 'Attendance':
      return renderAttendance();
    case 'Marks/Results':
      return renderMarksResults();
    case 'Timetable':
      return renderTimetable();
    case 'Assignments':
      return renderAssignments();
    case 'Fee & Payments':
      return renderFeePayments();
    case 'Announcements':
      return renderAnnouncements();
    case 'Calendar':
      return renderCalendar();
    case 'Reports':
      return renderReports();
    case 'Notifications':
      return renderNotifications();
    case 'Profile':
      return renderProfile();
    default:
      return renderDashboard();
  }
};

return (
    <div className="flex h-screen bg-slate-100 font-sans text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-center gap-3">
          <img src="/assets/logo.png" alt="EduMind Logo" className="h-32 w-auto max-w-full object-contain" />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => handleSectionChange(item.id)}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full p-3 rounded-xl transition-colors duration-200 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center">{activeSection}</h1>
          </div>
          <div className="flex items-center gap-8 ml-auto">
            <div className="relative">
              <button
                  onClick={() => setActiveSection('Notifications')}
                  className={`relative p-2 rounded-full transition-colors ${activeSection === 'Notifications' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}`}
              >
                <Bell size={28} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
            </div>

            <button
              onClick={() => handleSectionChange('Profile')}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors z-20 relative"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{studentData.name}</p>
                <p className="text-xs text-gray-500 font-medium">{studentData.class} - {studentData.section}</p>
              </div>
              <img
                src={studentData.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name)}&background=c7d2fe&color=3730a3&size=40`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer"
              />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full ${active ? 'bg-sky-50 text-sky-600 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
  >
    <Icon size={20} className={active ? 'text-sky-600' : 'text-gray-400 group-hover:text-sky-600 transition-colors'} />
    <span className="flex-1 text-left">{label}</span>
  </button>
);

export default StudentDashboard
;