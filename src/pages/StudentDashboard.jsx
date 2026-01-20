import React from 'react';

export default function StudentDashboard() {
  const studentStats = {
    gpa: '3.85',
    attendance: '92%',
    classesAttended: '92/100',
    pendingAssignments: 3,
    upcomingExams: 2,
  };

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', date: 'Jan 10' },
    { subject: 'English', grade: 'A-', date: 'Jan 8' },
    { subject: 'Science', grade: 'A', date: 'Jan 5' },
  ];

  const assignments = [
    { title: 'Math Project', dueDate: 'Jan 20', status: 'pending' },
    { title: 'Science Assignment', dueDate: 'Jan 18', status: 'pending' },
    { title: 'History Essay', dueDate: 'Jan 25', status: 'submitted' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your academic overview.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">GPA</p>
              <p className="text-3xl font-bold text-blue-600">{studentStats.gpa}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Attendance</p>
              <p className="text-3xl font-bold text-green-600">{studentStats.attendance}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Classes Attended</p>
              <p className="text-3xl font-bold text-purple-600">{studentStats.classesAttended}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Pending Tasks</p>
              <p className="text-3xl font-bold text-orange-600">{studentStats.pendingAssignments}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Upcoming Exams</p>
              <p className="text-3xl font-bold text-red-600">{studentStats.upcomingExams}</p>
            </div>
          </div>
        </section>

        {/* Recent Grades & Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Grades */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Grades</h2>
            <div className="space-y-3">
              {recentGrades.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold text-gray-900">{item.subject}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  <span className="text-lg font-bold text-green-600">{item.grade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Assignments</h2>
            <div className="space-y-3">
              {assignments.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">Due: {item.dueDate}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    item.status === 'submitted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Class Schedule */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">This Week's Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Monday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tuesday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Wednesday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Thursday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Friday</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-sm text-gray-700">Mathematics</td>
                  <td className="py-3 px-4 text-sm text-gray-700">English</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Science</td>
                  <td className="py-3 px-4 text-sm text-gray-700">History</td>
                  <td className="py-3 px-4 text-sm text-gray-700">PE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
