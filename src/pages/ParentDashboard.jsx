import React from 'react';

export default function ParentDashboard() {
  const children = [
    { name: 'Aarjav Patel', class: 'Class 10-A', gpa: '3.85' },
    { name: 'Ananya Patel', class: 'Class 8-B', gpa: '3.92' },
  ];

  const announcements = [
    { title: 'Parent-Teacher Meeting', date: 'Jan 20', icon: '📢' },
    { title: 'Annual Sports Day', date: 'Jan 25', icon: '🏆' },
    { title: 'Board Exam Schedule', date: 'Released', icon: '📅' },
  ];

  const childrenProgress = [
    {
      name: 'Aarjav Patel',
      attendance: 92,
      gpa: 3.85,
      subjects: [
        { name: 'Mathematics', grade: 'A' },
        { name: 'English', grade: 'A-' },
        { name: 'Science', grade: 'A' },
      ]
    },
    {
      name: 'Ananya Patel',
      attendance: 95,
      gpa: 3.92,
      subjects: [
        { name: 'Mathematics', grade: 'A+' },
        { name: 'English', grade: 'A' },
        { name: 'Science', grade: 'A' },
      ]
    }
  ];

  const fees = [
    { month: 'January', amount: '$500', status: 'Paid', date: 'Jan 5' },
    { month: 'December', amount: '$500', status: 'Paid', date: 'Dec 15' },
    { month: 'February', amount: '$500', status: 'Pending', date: 'Due Feb 5' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your child's academic progress.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Children Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Children</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{child.name}</p>
                    <p className="text-sm text-gray-600">{child.class}</p>
                    <p className="text-sm font-bold text-blue-600">GPA: {child.gpa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Progress */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Academic Progress</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {childrenProgress.map((child, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{child.name}</h3>
                
                {/* Attendance & GPA */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-gray-600 text-sm">Attendance</p>
                    <p className="text-2xl font-bold text-blue-600">{child.attendance}%</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <p className="text-gray-600 text-sm">GPA</p>
                    <p className="text-2xl font-bold text-green-600">{child.gpa}</p>
                  </div>
                </div>

                {/* Subject Grades */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900 mb-3">Subject Grades</p>
                  <div className="space-y-2">
                    {child.subjects.map((subject, subIdx) => (
                      <div key={subIdx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{subject.name}</span>
                        <span className="font-bold text-gray-900">{subject.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Payment Status & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fee Payment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fee Payment Status</h2>
            <div className="space-y-3">
              {fees.map((fee, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold text-gray-900">{fee.month}</p>
                    <p className="text-xs text-gray-500">{fee.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{fee.amount}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      fee.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {fee.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">School Announcements</h2>
            <div className="space-y-3">
              {announcements.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Communication */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Communication</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '📧', label: 'Email Notifications', count: '12 unread' },
              { icon: '📱', label: 'Messages', count: '5 new' },
              { icon: '📞', label: 'Calls Available', count: '9:00 AM - 5:00 PM' },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-3xl mb-2">{item.icon}</p>
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
