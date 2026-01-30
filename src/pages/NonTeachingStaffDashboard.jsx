import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Trophy,
  Clock,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  DollarSign,
  BarChart3,
  Download,
  Upload,
  Eye,
  Star,
  Activity,
  PieChart,
  Zap,
  Mail,
  Menu,
  Settings,
  Phone,
  MapPin,
  Plus,
  UserMinus,
  X,
  Car,
  Route,
  Clock as ClockIcon,
  Play,
  Square,
  AlertTriangle as AlertIcon
} from 'lucide-react';

const NonTeachingStaffDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [staffType, setStaffType] = useState('office-staff');
  const [tripStatus, setTripStatus] = useState('Not Started'); // For driver

  useEffect(() => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      if (registeredUsers.staff && registeredUsers.staff.staffType) {
        setStaffType(registeredUsers.staff.staffType);
      }
    } catch (error) {
      console.error('Error fetching staff type:', error);
    }
  }, []);

  const staffName = 'John Doe'; // Placeholder, can be fetched from localStorage
  const staffRole = staffType === 'driver' ? 'Driver' : staffType === 'office-staff' ? 'Office Staff' : staffType === 'accountant' ? 'Accountant' : staffType === 'librarian' ? 'Librarian' : 'Helper';

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    onLogout();
    navigate('/');
  };

  // Dummy data for common sections
  const pendingTasks = [
    { title: 'Update Student Records', department: 'Admin', priority: 'High', due: 'Today', status: 'Pending' },
    { title: 'Process Fee Payments', department: 'Finance', priority: 'Medium', due: 'Tomorrow', status: 'In Progress' },
    { title: 'Organize Library Books', department: 'Library', priority: 'Low', due: 'This Week', status: 'Pending' },
  ];

  const notifications = [
    { message: 'New student enrollment request', time: '2 hours ago', type: 'info' },
    { message: 'Staff meeting at 3 PM', time: '1 hour ago', type: 'reminder' },
    { message: 'System maintenance tonight', time: '30 mins ago', type: 'alert' },
  ];

  const todaySchedule = [
    { task: 'Morning Assembly', time: '8:00 AM - 9:00 AM', location: 'School Hall' },
    { task: 'Student Registration', time: '9:00 AM - 11:00 AM', location: 'Admin Office' },
    { task: 'Lunch Break', time: '12:00 PM - 1:00 PM', location: 'Cafeteria' },
  ];

  const notices = [
    { title: 'School Holiday Notice', content: 'School will be closed on Monday due to public holiday.', date: 'Jan 20, 2024', type: 'announcement' },
    { title: 'Emergency Drill', content: 'Fire drill scheduled for tomorrow at 10 AM.', date: 'Jan 21, 2024', type: 'alert' },
    { title: 'New Policy Update', content: 'Updated attendance policy effective from next week.', date: 'Jan 19, 2024', type: 'message' },
  ];

  // Driver-specific data
  const vehicleDetails = {
    number: 'MH-12-AB-1234',
    route: 'Route A - North Campus',
    pickupPoints: ['Stop 1: Main Gate', 'Stop 2: Market Road', 'Stop 3: Park Avenue'],
    dropPoints: ['School Main Entrance'],
    shift: 'Morning Shift (7:00 AM - 2:00 PM)'
  };

  const tripSchedule = {
    morningPickup: '7:30 AM',
    afternoonDrop: '2:30 PM',
    schoolArrival: '8:15 AM',
    schoolDeparture: '2:15 PM'
  };

  const studentTransportList = [
    { name: 'Aarav Sharma', stop: 'Main Gate', pickupTime: '7:30 AM', contact: '+91-9876543210' },
    { name: 'Vivaan Gupta', stop: 'Market Road', pickupTime: '7:45 AM', contact: '+91-9876543211' },
    { name: 'Aditya Patel', stop: 'Park Avenue', pickupTime: '8:00 AM', contact: '+91-9876543212' },
  ];

  const driverAlerts = [
    { message: 'Heavy traffic on Route A, expect 15 min delay', time: '8:00 AM', type: 'delay' },
    { message: 'Route change: Stop 2 shifted to new location', time: '7:45 AM', type: 'route' },
    { message: 'Emergency: Bus breakdown reported at Stop 3', time: '8:15 AM', type: 'emergency' },
  ];

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: activeView === 'dashboard', onClick: () => setActiveView('dashboard') },
    { icon: <Calendar size={20} />, label: 'Schedule', active: activeView === 'schedule', onClick: () => setActiveView('schedule') },
    { icon: <Bell size={20} />, label: 'Notices', active: activeView === 'notices', onClick: () => setActiveView('notices') },
    { icon: <User size={20} />, label: 'Profile', active: activeView === 'profile', onClick: () => setActiveView('profile') },
  ];

  // Add driver-specific menu items if staffType is driver
  if (staffType === 'driver') {
    menuItems.splice(1, 0, { icon: <Car size={20} />, label: 'Transport', active: activeView === 'transport', onClick: () => setActiveView('transport') });
  }

  const staffStats = {
    tasksPending: 5,
    requestsProcessed: 23,
    hoursLogged: 38,
    leaveBalance: 12,
  };

  const recentActivities = [
    { user: 'Admin', action: 'Approved leave request', time: '2 hours ago' },
    { user: 'System', action: 'Updated attendance records', time: '4 hours ago' },
    { user: 'Teacher', action: 'Submitted student report', time: '6 hours ago' },
  ];

  const tasks = [
    { title: 'Process Admission Forms', department: 'Admin', priority: 'High', due: 'Today', status: 'In Progress' },
    { title: 'Update Fee Records', department: 'Finance', priority: 'Medium', due: 'Tomorrow', status: 'Pending' },
    { title: 'Organize Event Materials', department: 'Events', priority: 'Low', due: 'This Week', status: 'Completed' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-gray-800 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-center gap-3">
          <img
            src="/assets/logo.png"
            alt="EduMind Logo"
            className="h-32 w-auto max-w-full object-contain cursor-pointer"
            onClick={() => setActiveView('dashboard')}
          />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group w-full ${item.active ? 'bg-sky-50 text-sky-600 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 text-gray-600 hover:bg-red-50 hover:text-red-600 w-full p-3 rounded-xl transition-colors duration-200 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Non-Teaching Staff Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Bell size={28} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-900">{staffName}</p>
              <p className="text-xs text-gray-500 font-medium">{staffRole}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
              {staffName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100">
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {staffName}</h2>
                <p className="text-lg text-gray-600">Role: {staffRole}</p>
              </div>

              {/* Quick Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
                  <div className="space-y-2">
                    {pendingTasks.slice(0, 3).map((task, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock size={16} className="text-orange-500" />
                        <span className="text-sm text-gray-600">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map((notif, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Bell size={16} className="text-blue-500" />
                        <span className="text-sm text-gray-600">{notif.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
                  <div className="space-y-2">
                    {todaySchedule.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Calendar size={16} className="text-green-500" />
                        <span className="text-sm text-gray-600">{item.task} - {item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attendance */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-In</p>
                    <p className="font-semibold">8:30 AM</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Present</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check-In</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Check-Out</button>
                </div>
              </div>

              {/* Notices & Alerts */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notices & Alerts</h3>
                <div className="space-y-4">
                  {notices.map((notice, index) => (
                    <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                      <h4 className="font-semibold text-gray-900">{notice.title}</h4>
                      <p className="text-gray-600 mt-1">{notice.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{notice.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{staffName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-semibold">{staffRole}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">+91-9876543210</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Profile</button>
                  </div>
                </div>
              </div>

              {/* Driver-Specific Sections */}
              {staffType === 'driver' && (
                <>
                  {/* Route & Vehicle Details */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Route & Vehicle Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Vehicle Number</p>
                        <p className="font-semibold">{vehicleDetails.number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Route Name</p>
                        <p className="font-semibold">{vehicleDetails.route}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pickup Points</p>
                        <ul className="list-disc list-inside text-sm">
                          {vehicleDetails.pickupPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Drop Points</p>
                        <ul className="list-disc list-inside text-sm">
                          {vehicleDetails.dropPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Assigned Shift</p>
                        <p className="font-semibold">{vehicleDetails.shift}</p>
                      </div>
                    </div>
                  </div>

                  {/* Daily Trip Schedule */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Trip Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Morning Pickup Time</p>
                        <p className="font-semibold">{tripSchedule.morningPickup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Afternoon Drop Time</p>
                        <p className="font-semibold">{tripSchedule.afternoonDrop}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">School Arrival</p>
                        <p className="font-semibold">{tripSchedule.schoolArrival}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">School Departure</p>
                        <p className="font-semibold">{tripSchedule.schoolDeparture}</p>
                      </div>
                    </div>
                  </div>

                  {/* Student Transport List */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Transport List</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Student Name</th>
                            <th className="text-left py-2">Stop Name</th>
                            <th className="text-left py-2">Pickup Time</th>
                            <th className="text-left py-2">Contact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentTransportList.map((student, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{student.name}</td>
                              <td className="py-2">{student.stop}</td>
                              <td className="py-2">{student.pickupTime}</td>
                              <td className="py-2">{student.contact}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Trip Status */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Status</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-gray-600">Current Status:</span>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        tripStatus === 'Not Started' ? 'bg-gray-100 text-gray-800' :
                        tripStatus === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {tripStatus}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTripStatus('In Progress')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                      >
                        <Play size={16} /> Start Trip
                      </button>
                      <button
                        onClick={() => setTripStatus('Completed')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                      >
                        <Square size={16} /> End Trip
                      </button>
                    </div>
                  </div>

                  {/* Driver Alerts */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Alerts</h3>
                    <div className="space-y-4">
                      {driverAlerts.map((alert, index) => (
                        <div key={index} className={`border-l-4 p-4 rounded ${
                          alert.type === 'delay' ? 'border-l-orange-500 bg-orange-50' :
                          alert.type === 'route' ? 'border-l-blue-500 bg-blue-50' :
                          'border-l-red-500 bg-red-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <AlertIcon size={16} className={
                              alert.type === 'delay' ? 'text-orange-600' :
                              alert.type === 'route' ? 'text-blue-600' :
                              'text-red-600'
                            } />
                            <span className="text-sm font-medium text-gray-900">
                              {alert.type === 'delay' ? 'Delay Notification' :
                               alert.type === 'route' ? 'Route Change' :
                               'Emergency'}
                            </span>
                          </div>
                          <p className="text-gray-700">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeView !== 'dashboard' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </h2>
              <p className="text-gray-600 mt-4">Content for {activeView} will be displayed here.</p>
            </div>
          )}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Logout?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonTeachingStaffDashboard;
