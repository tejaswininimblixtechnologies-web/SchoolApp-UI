import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Bus,
  DollarSign,
  CalendarCheck,
  Wrench,
  LogOut,
  Search,
  Bell,
  Phone,
  Mail,
  Plus,
  User,
  Menu,
  X,
  Settings,
  Edit,
  Trash2,
  AlertCircle,
  Eye,
} from 'lucide-react';

const ParentsPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin User');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Parents');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newParent, setNewParent] = useState({
    name: '',
    email: '',
    phone: '',
    children: '',
    address: '',
    status: 'Active',
    relationship: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [parentToDelete, setParentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  useEffect(() => {
    const fetchAdminName = () => {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setAdminName(storedName);
        return;
      }
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (registeredUsers.admin && registeredUsers.admin.firstName) {
          setAdminName(`${registeredUsers.admin.firstName} ${registeredUsers.admin.lastName}`);
        }
      } catch (error) {
        console.error('Error fetching admin name:', error);
      }
    };
    fetchAdminName();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  // Sample parent data
  const [parents, setParents] = useState([
    {
      id: 'PAR001',
      name: 'Robert Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Johnson&background=5A4FCF&color=fff',
      email: 'robert.johnson@email.com',
      phone: '+1-555-0123',
      children: ['Alice Johnson (Grade 10)', 'Bob Johnson (Grade 8)'],
      address: '123 Main St, New York, NY',
      status: 'Active'
    },
    {
      id: 'PAR002',
      name: 'Sarah Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=5A4FCF&color=fff',
      email: 'sarah.chen@email.com',
      phone: '+1-555-0124',
      children: ['Michael Chen (Grade 9)'],
      address: '456 Oak Ave, Los Angeles, CA',
      status: 'Active'
    },
    {
      id: 'PAR003',
      name: 'James Davis',
      avatar: 'https://ui-avatars.com/api/?name=James+Davis&background=5A4FCF&color=fff',
      email: 'james.davis@email.com',
      phone: '+1-555-0125',
      children: ['Emma Davis (Grade 11)'],
      address: '789 Pine Rd, Chicago, IL',
      status: 'Inactive'
    },
    {
      id: 'PAR004',
      name: 'Lisa Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Wilson&background=5A4FCF&color=fff',
      email: 'lisa.wilson@email.com',
      phone: '+1-555-0126',
      children: ['Ryan Wilson (Grade 8)', 'Sophie Wilson (Grade 6)'],
      address: '321 Elm St, Houston, TX',
      status: 'Active'
    },
    {
      id: 'PAR005',
      name: 'David Brown',
      avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=5A4FCF&color=fff',
      email: 'david.brown@email.com',
      phone: '+1-555-0127',
      children: ['Sophia Brown (Grade 12)'],
      address: '654 Maple Dr, Phoenix, AZ',
      status: 'Active'
    },
    {
      id: 'PAR006',
      name: 'Jennifer Martinez',
      avatar: 'https://ui-avatars.com/api/?name=Jennifer+Martinez&background=5A4FCF&color=fff',
      email: 'jennifer.martinez@email.com',
      phone: '+1-555-0128',
      children: ['Carlos Martinez (Grade 7)'],
      address: '987 Cedar Ln, Miami, FL',
      status: 'Active'
    },
    {
      id: 'PAR007',
      name: 'William Taylor',
      avatar: 'https://ui-avatars.com/api/?name=William+Taylor&background=5A4FCF&color=fff',
      email: 'william.taylor@email.com',
      phone: '+1-555-0129',
      children: ['Olivia Taylor (Grade 10)', 'Lucas Taylor (Grade 5)'],
      address: '654 Birch Blvd, Seattle, WA',
      status: 'Active'
    },
    {
      id: 'PAR008',
      name: 'Elizabeth Anderson',
      avatar: 'https://ui-avatars.com/api/?name=Elizabeth+Anderson&background=5A4FCF&color=fff',
      email: 'elizabeth.anderson@email.com',
      phone: '+1-555-0130',
      children: ['Ava Anderson (Grade 9)'],
      address: '321 Spruce St, Boston, MA',
      status: 'Inactive'
    },
    {
      id: 'PAR009',
      name: 'Richard Thomas',
      avatar: 'https://ui-avatars.com/api/?name=Richard+Thomas&background=5A4FCF&color=fff',
      email: 'richard.thomas@email.com',
      phone: '+1-555-0131',
      children: ['Isabella Thomas (Grade 11)'],
      address: '159 Willow Way, Denver, CO',
      status: 'Active'
    },
    {
      id: 'PAR010',
      name: 'Patricia Jackson',
      avatar: 'https://ui-avatars.com/api/?name=Patricia+Jackson&background=5A4FCF&color=fff',
      email: 'patricia.jackson@email.com',
      phone: '+1-555-0132',
      children: ['Mason Jackson (Grade 8)', 'Ethan Jackson (Grade 6)'],
      address: '753 Palm Dr, San Diego, CA',
      status: 'Active'
    },
  ]);

  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.children.some(child => child.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'All Parents' || parent.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  let sortedParents = [...filteredParents];

  const totalPages = Math.ceil(sortedParents.length / itemsPerPage);
  const paginatedParents = sortedParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddParent = (e) => {
    e.preventDefault();
    if (isEditing) {
      setParents(parents.map(p => p.id === editId ? {
        ...p,
        ...newParent,
        children: typeof newParent.children === 'string' ? newParent.children.split(',').map(c => c.trim()) : newParent.children
      } : p));
    } else {
      const parent = {
        id: `PAR00${parents.length + 1}`,
        ...newParent,
        avatar: `https://ui-avatars.com/api/?name=${newParent.name}&background=0EA5E9&color=fff`,
        children: newParent.children.split(',').map(c => c.trim())
      };
      setParents([...parents, parent]);
    }
    setShowAddModal(false);
    setNewParent({ name: '', email: '', phone: '', children: '', address: '', status: 'Active', relationship: '' });
    setIsEditing(false);
  };

  const openEditModal = (parent) => {
    setIsEditing(true);
    setEditId(parent.id);
    setNewParent({
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
      children: parent.children.join(', '),
      address: parent.address,
      status: parent.status,
      relationship: parent.relationship || ''
    });
    setShowAddModal(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setNewParent({ name: '', email: '', phone: '', children: '', address: '', status: 'Active', relationship: '' });
    setShowAddModal(true);
  };

  const confirmDelete = (parent) => {
    setParentToDelete(parent);
    setShowDeleteModal(true);
  };

  const handleDeleteParent = () => {
    setParents(parents.filter(p => p.id !== parentToDelete.id));
    setShowDeleteModal(false);
    setParentToDelete(null);
  };

  const handleViewParent = (parent) => {
    setSelectedParent(parent);
    setShowViewModal(true);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-gray-800 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-center gap-3">
          <img src="/assets/logo.png" alt="EduMind Logo" className="h-32 w-auto max-w-full object-contain" />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => navigate('/admin')} />
          <NavItem icon={<GraduationCap size={20} />} label="Students" onClick={() => navigate('/admin/students')} />
          <NavItem icon={<Users size={20} />} label="Teachers" onClick={() => navigate('/admin/teachers')} />
          <NavItem icon={<User size={20} />} label="Parents" active onClick={() => navigate('/admin/parents')} />
          <NavItem icon={<Bus size={20} />} label="Driver & Vehicles" onClick={() => navigate('/admin/drivers')} />
          <NavItem icon={<DollarSign size={20} />} label="Finance" onClick={() => navigate('/admin/finance')} />
          <NavItem icon={<CalendarCheck size={20} />} label="Attendance" onClick={() => navigate('/admin/attendance')} />
          <NavItem icon={<Wrench size={20} />} label="Maintenance" onClick={() => navigate('/admin/maintenance')} />
          <NavItem icon={<Settings size={20} />} label="Settings" onClick={() => navigate('/admin/settings')} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full p-3 rounded-xl transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
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
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search parents..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-sm text-gray-600 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/admin/notifications')}
              className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <Bell size={28} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button onClick={() => navigate('/admin/profile')} className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:bg-gray-50 rounded-lg -ml-2 p-2 transition-colors">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{adminName}</p>
                <p className="text-xs text-gray-500 font-medium">Admin Administrator</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(adminName)}&background=c7d2fe&color=3730a3`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Parents</h1>
                <p className="text-gray-600">Manage and view parent information and contacts</p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <option>All Parents</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <button 
                  onClick={openAddModal}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Parent
                </button>
              </div>
            </div>

            {/* Parents Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Children</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Address</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedParents.map((parent, index) => (
                      <tr key={parent.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={parent.avatar}
                              alt={parent.name}
                              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            />
                            <span className="font-medium text-gray-900">{parent.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{parent.id}</td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {parent.children.map((child, idx) => (
                              <div key={idx} className="text-sm text-gray-600">{child}</div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => window.open(`tel:${parent.phone}`, '_self')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title={`Call ${parent.phone}`}
                            >
                              <Phone size={16} />
                            </button>
                            <button
                              onClick={() => window.open(`mailto:${parent.email}`, '_self')}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title={`Email ${parent.email}`}
                            >
                              <Mail size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{parent.address}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${parent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {parent.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleViewParent(parent)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => openEditModal(parent)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => confirmDelete(parent)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {paginatedParents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredParents.length)} of {filteredParents.length} parents
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 text-sm rounded-lg transition-colors ${currentPage === page ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}`}>{page}</button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Parent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Parent' : 'Add New Parent'}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddParent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newParent.name}
                  onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                  placeholder="e.g., Robert Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newParent.email}
                  onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                  placeholder="e.g., robert@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newParent.phone}
                  onChange={(e) => setNewParent({...newParent, phone: e.target.value})}
                  placeholder="e.g., +1-555-0123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newParent.relationship}
                  onChange={(e) => setNewParent({...newParent, relationship: e.target.value})}
                  placeholder="e.g., Father, Mother"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Children (comma separated)</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newParent.children}
                  onChange={(e) => setNewParent({...newParent, children: e.target.value})}
                  placeholder="e.g., Alice (Grade 10), Bob (Grade 8)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  value={newParent.status}
                  onChange={(e) => setNewParent({...newParent, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-2 rounded-xl font-semibold hover:bg-sky-700 transition-colors mt-4"
              >
                {isEditing ? 'Save Changes' : 'Add Parent'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Parent Modal */}
      {showViewModal && selectedParent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Parent Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedParent.avatar} alt={selectedParent.name} className="w-20 h-20 rounded-full border-4 border-gray-50" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedParent.name}</h4>
                  <p className="text-gray-500 text-sm">{selectedParent.id}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${selectedParent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {selectedParent.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Contact Information</label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail size={16} className="text-gray-400" />
                      <span>{selectedParent.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone size={16} className="text-gray-400" />
                      <span>{selectedParent.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Address</label>
                  <p className="mt-1 text-gray-700">{selectedParent.address}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Children ({selectedParent.children.length})</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedParent.children.map((child, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                        {child}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && parentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Parent?</h3>
              <p className="text-gray-600">
                Are you sure you want to delete <strong>{parentToDelete.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteParent}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${active ? 'bg-sky-50 text-sky-600 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
  >
    <span className={`${active ? 'text-sky-600' : 'text-gray-400 group-hover:text-sky-600 transition-colors'}`}>{icon}</span>
    <span>{label}</span>
  </button>
);

export default ParentsPage;
