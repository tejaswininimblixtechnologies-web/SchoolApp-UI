import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Bell,
  Menu,
  LogOut,
  Users,
  Plus,
  UserMinus,
  X,
  Award,
  MessageSquare,
  Calendar,
  Settings,
  Activity,
  CheckCircle,
  Clock,
  UserCheck,
  FileText,
  MessageCircle
} from 'lucide-react';

const TeacherDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [staffType, setStaffType] = useState('teaching');
  const [activeView, setActiveView] = useState('dashboard');
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);
  const [newStudentRequest, setNewStudentRequest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rollNumber: '',
    className: '',
    reason: ''
  });
  const [deleteStudentRequest, setDeleteStudentRequest] = useState({
    studentId: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState('');

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

  const handleAddRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestError('');
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'staff')) {
        throw new Error('Authentication error: Not authorized.');
      }
      const token = currentUser?.token;

      const response = await fetch('http://localhost:5000/api/student-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'add',
          studentData: {
            firstName: newStudentRequest.firstName,
            lastName: newStudentRequest.lastName,
            email: newStudentRequest.email,
            phone: newStudentRequest.phone,
            rollNumber: newStudentRequest.rollNumber,
            className: newStudentRequest.className,
          },
          reason: newStudentRequest.reason,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Request to add student submitted successfully.');
        setShowAddRequestModal(false);
        setNewStudentRequest({ firstName: '', lastName: '', email: '', phone: '', rollNumber: '', className: '', reason: '' });
      } else {
        setRequestError(result.error || 'Failed to submit request.');
      }
    } catch (error) {
      setRequestError('Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestError('');
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'staff')) {
        throw new Error('Authentication error: Not a teacher.');
      }
      const token = currentUser?.token;

      const response = await fetch('http://localhost:5000/api/student-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'delete', studentData: { studentId: deleteStudentRequest.studentId }, reason: deleteStudentRequest.reason }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Request to remove student submitted successfully.');
        setShowDeleteRequestModal(false);
        setDeleteStudentRequest({ studentId: '', reason: '' });
      } else {
        setRequestError(result.error || 'Failed to submit request.');
      }
    } catch (error) {
      setRequestError('Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const teacherStats = {
    totalStudents: 128,
    classesPerDay: 4,
    assignmentsPending: 45,
    attendanceAverage: '88%',
  };

  const classes = [
    { name: 'Class 10-A', subject: 'Mathematics', students: 32, status: 'Active' },
    { name: 'Class 10-B', subject: 'Mathematics', students: 30, status: 'Active' },
    { name: 'Class 11-A', subject: 'Mathematics', students: 33, status: 'Active' },
    { name: 'Class 12-B', subject: 'Mathematics', students: 33, status: 'Active' },
  ];

  const submittedAssignments = [
    { title: 'Chapter 5 Problems', class: 'Class 10-A', submitted: 28, total: 32, date: 'Jan 12' },
    { title: 'Project Work', class: 'Class 10-B', submitted: 25, total: 30, date: 'Jan 10' },
    { title: 'Test Paper', class: 'Class 11-A', submitted: 31, total: 33, date: 'Jan 8' },
  ];

  const todaySchedule = [
    { time: '09:00 AM', class: 'Class 10-A', subject: 'Mathematics' },
    { time: '10:15 AM', class: 'Class 10-B', subject: 'Mathematics' },
    { time: '11:30 AM', class: 'Class 11-A', subject: 'Mathematics' },
    { time: '02:00 PM', class: 'Class 12-B', subject: 'Mathematics' },
  ];

  // Non-Teaching Staff Data
  const staffStats = {
    tasksPending: 8,
    requestsProcessed: 24,
    hoursLogged: '160h',
    leaveBalance: '12 Days',
  };

  const tasks = [
    { title: 'Inventory Audit', department: 'Logistics', priority: 'High', status: 'In Progress', due: 'Jan 20' },
    { title: 'Submit Expense Report', department: 'Finance', priority: 'Medium', status: 'Pending', due: 'Jan 22' },
    { title: 'Update Staff Records', department: 'HR', priority: 'Low', status: 'Completed', due: 'Jan 15' },
    { title: 'Facility Maintenance Check', department: 'Admin', priority: 'High', status: 'Pending', due: 'Jan 25' },
  ];

  const recentActivities = [
    { action: 'Processed Leave Request', user: 'John Doe', time: '2 hours ago' },
    { action: 'Updated Inventory', user: 'System', time: '5 hours ago' },
    { action: 'Generated Monthly Report', user: 'System', time: '1 day ago' },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const teacherName = 'Teacher'; // Placeholder, can be fetched from localStorage

  const teacherMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: activeView === 'dashboard', onClick: () => setActiveView('dashboard') },
    { icon: <GraduationCap size={20} />, label: 'My Classes', active: activeView === 'classes', onClick: () => setActiveView('classes') },
    { icon: <BookOpen size={20} />, label: 'Assignments', active: activeView === 'assignments', onClick: () => setActiveView('assignments') },
    { icon: <CalendarCheck size={20} />, label: 'Attendance', active: activeView === 'attendance', onClick: () => setActiveView('attendance') },
    { icon: <Users size={20} />, label: 'Students', active: activeView === 'students', onClick: () => setActiveView('students') },
    { icon: <Award size={20} />, label: 'Marks / Grades', active: activeView === 'marks', onClick: () => setActiveView('marks') },
    { icon: <MessageSquare size={20} />, label: 'Messages', active: activeView === 'messages', onClick: () => setActiveView('messages') },
    { icon: <Calendar size={20} />, label: 'Timetable', active: activeView === 'timetable', onClick: () => setActiveView('timetable') },
    { icon: <Settings size={20} />, label: 'Profile / Settings', active: activeView === 'profile', onClick: () => setActiveView('profile') },
  ];

  if (staffType === 'non-teaching') {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your administrative tasks and overview.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Statistics Cards */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Pending Tasks</p>
                <p className="text-3xl font-bold text-orange-600">{staffStats.tasksPending}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Requests Processed</p>
                <p className="text-3xl font-bold text-green-600">{staffStats.requestsProcessed}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Hours Logged</p>
                <p className="text-3xl font-bold text-blue-600">{staffStats.hoursLogged}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Leave Balance</p>
                <p className="text-3xl font-bold text-purple-600">{staffStats.leaveBalance}</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Task List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Tasks</h2>
              <div className="space-y-3">
                {tasks.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.department}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        item.priority === 'High' ? 'bg-red-100 text-red-800' :
                        item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Due: {item.due}</span>
                      <span className="text-xs font-medium text-gray-700">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {item.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {teacherMenuItems.map((item, index) => (
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
            <h1 className="text-2xl font-bold text-gray-900">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Bell size={28} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <MessageCircle size={28} />
            </button>
            <button type="button" onClick={() => navigate('/profile')} className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:bg-gray-50 rounded-lg -ml-2 p-2 transition-colors z-20 relative">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{teacherName}</p>
                <p className="text-xs text-gray-500 font-medium">Teacher</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacherName)}&background=c7d2fe&color=3730a3`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100">
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {teacherName}</h1>
                <p className="text-gray-600 mt-2">Here's your teaching dashboard overview for today.</p>
              </div>

              {/* Summary Cards */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Classes Today</p>
                  <p className="text-3xl font-bold text-blue-600">{teacherStats.classesPerDay}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-green-600">{teacherStats.totalStudents}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Pending Attendance</p>
                  <p className="text-3xl font-bold text-orange-600">12</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Upcoming Assignments</p>
                  <p className="text-3xl font-bold text-purple-600">{teacherStats.assignmentsPending}</p>
                </div>
              </section>

              {/* Today's Schedule */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
                <div className="space-y-3">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                      <div className="text-2xl">📚</div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.class}</p>
                        <p className="text-sm text-gray-600">{item.subject}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <UserCheck size={24} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Take Attendance</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Plus size={24} className="text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Add Assignment</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Award size={24} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">Enter Grades</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <MessageCircle size={24} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-900">Message Class</span>
                  </button>
                </div>
              </div>

              {/* Activity Feed & Calendar */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity Feed */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivities.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {item.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.action}</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar Widget */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Calendar</h2>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Current Month View</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Calendar size={48} className="mx-auto text-blue-600 mb-2" />
                      <p className="text-lg font-semibold text-gray-900">January 2024</p>
                      <p className="text-sm text-gray-600">Calendar widget placeholder</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Schedule & My Classes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Today's Schedule */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
                  <div className="space-y-3">
                    {todaySchedule.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                        <div className="text-2xl">📚</div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.class}</p>
                          <p className="text-sm text-gray-600">{item.subject}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Classes */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">My Classes</h2>
                  <div className="space-y-3">
                    {classes.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.subject}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">👥 {item.students} Students</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assignment Submissions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assignment Submissions</h2>
                <div className="space-y-4">
                  {submittedAssignments.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.class}</p>
                        </div>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(item.submitted / item.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          {item.submitted}/{item.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Management Requests */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Student Management</h2>
                <p className="text-gray-600 mb-6">Request to add or remove students from your classes. All requests require admin approval.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowAddRequestModal(true)}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Plus className="text-white" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-green-800">Add New Student</p>
                      <p className="text-sm text-green-600">Request to enroll a new student</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowDeleteRequestModal(true)}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <div className="p-2 bg-red-500 rounded-lg">
                      <UserMinus className="text-white" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-red-800">Remove Student</p>
                      <p className="text-sm text-red-600">Request to remove a student</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
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

      {/* Add Student Request Modal */}
      {showAddRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Request to Add Student</h3>
              <button onClick={() => setShowAddRequestModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddRequestSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {requestError && <p className="text-red-500 text-sm">{requestError}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" required value={newStudentRequest.firstName} onChange={(e) => setNewStudentRequest({...newStudentRequest, firstName: e.target.value})} placeholder="First Name" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                <input type="text" required value={newStudentRequest.lastName} onChange={(e) => setNewStudentRequest({...newStudentRequest, lastName: e.target.value})} placeholder="Last Name" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                <input type="email" required value={newStudentRequest.email} onChange={(e) => setNewStudentRequest({...newStudentRequest, email: e.target.value})} placeholder="Email" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                <input type="tel" required value={newStudentRequest.phone} onChange={(e) => setNewStudentRequest({...newStudentRequest, phone: e.target.value})} placeholder="Phone" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                <input type="text" required value={newStudentRequest.rollNumber} onChange={(e) => setNewStudentRequest({...newStudentRequest, rollNumber: e.target.value})} placeholder="Roll Number" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                <input type="text" required value={newStudentRequest.className} onChange={(e) => setNewStudentRequest({...newStudentRequest, className: e.target.value})} placeholder="Class (e.g., 10-A)" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
              </div>
              <textarea value={newStudentRequest.reason} onChange={(e) => setNewStudentRequest({...newStudentRequest, reason: e.target.value})} placeholder="Reason for adding student..." className="w-full px-4 py-2 border border-gray-200 rounded-xl" rows="3"></textarea>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddRequestModal(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Student Request Modal */}
      {showDeleteRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Request to Remove Student</h3>
              <button onClick={() => setShowDeleteRequestModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleDeleteRequestSubmit} className="p-6 space-y-4">
              {requestError && <p className="text-red-500 text-sm">{requestError}</p>}
              <input type="text" required value={deleteStudentRequest.studentId} onChange={(e) => setDeleteStudentRequest({...deleteStudentRequest, studentId: e.target.value})} placeholder="Student ID (e.g., STU001)" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
              <textarea required value={deleteStudentRequest.reason} onChange={(e) => setDeleteStudentRequest({...deleteStudentRequest, reason: e.target.value})} placeholder="Reason for removal..." className="w-full px-4 py-2 border border-gray-200 rounded-xl" rows="4"></textarea>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowDeleteRequestModal(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
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
  </div>
  );
}

export default TeacherDashboard;
