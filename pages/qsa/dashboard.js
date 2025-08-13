import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
} from 'lucide-react';

export default function QSADashboard() {
  const [user, setUser] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [resolvedJobs, setResolvedJobs] = useState([]);
  const [conflictJobs, setConflictJobs] = useState([]);
  const [metrics, setMetrics] = useState({
    totalResolved: 0,
    totalConflicts: 0,
    resolvedToday: 0,
  });
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();
  const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } =
    useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'qsa') {
      router.push('/login');
      return;
    }
    setUser(parsedUser);
    loadDashboardData();
  }, [router]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/qsa/dashboard');
      const data = await response.json();

      setAllJobs(data.allJobs);
      setResolvedJobs(data.resolvedJobs);
      setConflictJobs(data.conflictJobs);
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      showError('Error loading dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async jobId => {
    // Usando toast para confirmação ao invés de alert
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete Job ID ${jobId}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch('/api/qsa/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          action: 'delete',
        }),
      });

      if (response.ok) {
        showSuccess(`Job ID ${jobId} permanently deleted from database.`);
        loadDashboardData(); // Reload data
      } else {
        showError(`Failed to delete Job ID ${jobId}. Please try again.`);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      showError('Error deleting job. Please try again.');
    }
  };

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return (
        date.toLocaleDateString() +
        ' ' +
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }
  };

  const getStatusBadge = status => {
    if (status === 'resolved') {
      return (
        <span className='px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200'>
          Resolved
        </span>
      );
    } else {
      return (
        <span className='px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200'>
          Conflict
        </span>
      );
    }
  };

  const getCurrentJobs = () => {
    switch (activeTab) {
      case 'resolved':
        return resolvedJobs;
      case 'conflicts':
        return conflictJobs;
      default:
        return allJobs;
    }
  };

  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess('Job ID copied to clipboard!', 2000);
    } catch (error) {
      showError('Failed to copy to clipboard');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Toast Container */}
      <div className='fixed top-0 right-0 z-50 p-4 space-y-2'>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Header */}
      <div className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                QSA Dashboard
              </h1>
              <p className='text-gray-600'>
                Quality System Analyst: {user.username}
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className='text-sm text-blue-600 hover:text-blue-800 cursor-pointer'
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Metrics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Total Resolved
                </p>
                <p className='text-3xl font-bold text-green-600'>
                  {metrics.totalResolved}
                </p>
              </div>
              <CheckCircle className='text-green-500' size={32} />
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Pending Conflicts
                </p>
                <p className='text-3xl font-bold text-red-600'>
                  {metrics.totalConflicts}
                </p>
              </div>
              <AlertTriangle className='text-red-500' size={32} />
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Resolved Today
                </p>
                <p className='text-3xl font-bold text-blue-600'>
                  {metrics.resolvedToday}
                </p>
              </div>
              <Calendar className='text-blue-500' size={32} />
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Jobs</p>
                <p className='text-3xl font-bold text-purple-600'>
                  {allJobs.length}
                </p>
              </div>
              <Users className='text-purple-500' size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='bg-white rounded-lg shadow-md'>
          <div className='border-b border-gray-200'>
            <nav className='flex space-x-8 px-6'>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All Jobs ({allJobs.length})
              </button>
              <button
                onClick={() => setActiveTab('resolved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'resolved'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Resolved ({resolvedJobs.length})
              </button>
              <button
                onClick={() => setActiveTab('conflicts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'conflicts'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Conflicts ({conflictJobs.length})
              </button>
            </nav>
          </div>

          <div className='p-6'>
            {loading ? (
              <div className='text-center py-12'>
                <p className='text-gray-600'>Loading jobs...</p>
              </div>
            ) : getCurrentJobs().length > 0 ? (
              <div className='space-y-4'>
                {getCurrentJobs().map(job => (
                  <div
                    key={job.id}
                    className='bg-gray-50 rounded-lg border border-gray-200 p-6'
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        {job.status === 'conflict' ? (
                          <AlertTriangle className='text-red-500' size={20} />
                        ) : (
                          <CheckCircle className='text-green-500' size={20} />
                        )}
                        <div>
                          <h3 className='text-lg font-semibold text-gray-800'>
                            Job ID: {job.id}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Completed: {formatTimestamp(job.submittedAt)} |
                            Created: {formatTimestamp(job.createdAt)}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>

                    <div className='grid md:grid-cols-2 gap-4 mb-4'>
                      <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
                        <p className='text-sm font-medium text-blue-800 mb-2'>
                          First Analyst: {job.analyst1}
                        </p>
                        <p className='text-sm text-blue-700'>{job.decision1}</p>
                      </div>
                      <div className='p-4 bg-purple-50 rounded-lg border border-purple-200'>
                        <p className='text-sm font-medium text-purple-800 mb-2'>
                          Second Analyst: {job.analyst2}
                        </p>
                        <p className='text-sm text-purple-700'>
                          {job.decision2 === 'AGREED_WITH_PREVIOUS'
                            ? '✅ Agreed with previous decision'
                            : job.decision2}
                        </p>
                      </div>
                    </div>

                    {job.finalDecision && (
                      <div className='mb-4 p-3 bg-green-50 rounded-lg border border-green-200'>
                        <p className='text-sm font-medium text-green-800 mb-1'>
                          Final Decision:
                        </p>
                        <p className='text-sm text-green-700'>
                          {job.finalDecision}
                        </p>
                      </div>
                    )}

                    <div className='flex gap-3'>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm cursor-pointer'
                      >
                        🗑️ Delete Permanently
                      </button>
                      <button
                        onClick={() => copyToClipboard(job.id)}
                        className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm cursor-pointer'
                      >
                        📋 Copy Job ID
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <CheckCircle
                  className='mx-auto text-green-500 mb-4'
                  size={48}
                />
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  No Jobs Found
                </h3>
                <p className='text-gray-600'>No jobs in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
