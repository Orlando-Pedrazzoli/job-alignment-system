import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DecisionTreeComponent from '../../components/DecisionTree';
import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import { Search, ArrowLeft, Check, AlertCircle, Users } from 'lucide-react';

export default function AnalystPage() {
  const [user, setUser] = useState(null);
  const [jobId, setJobId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [currentStep, setCurrentStep] = useState('search');
  const [decisionPath, setDecisionPath] = useState([]);
  const [finalDecision, setFinalDecision] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (parsedUser.role !== 'analyst') {
      router.push('/login');
      return;
    }
    setUser(parsedUser);
  }, [router]);

  const handleSearch = async () => {
    if (!jobId.trim()) {
      showWarning('Please enter a Job ID');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`/api/jobs/search?jobId=${jobId}`);
      const data = await response.json();

      setSearchResult(data);

      if (data.status === 'new') {
        setCurrentStep('decision-tree');
        showInfo('New Job ID found. Proceed with analysis.');
      } else if (data.status === 'second_analysis') {
        setCurrentStep('confirmation');
        showInfo('Previous analysis found. Please review and confirm.');
      }
    } catch (error) {
      console.error('Search error:', error);
      showError('Error searching for Job ID. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setJobId('');
    setSearchResult(null);
    setCurrentStep('search');
    setDecisionPath([]);
    setFinalDecision('');
  };

  const handleConfirmation = async agrees => {
    setLoading(true);

    try {
      const submitData = {
        jobId,
        analyst: user.username,
        isConfirmation: true,
        agrees,
      };

      if (!agrees && finalDecision) {
        submitData.decision = finalDecision;
      }

      const response = await fetch('/api/jobs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.status === 'resolved') {
        showSuccess(
          `Job ID ${jobId} resolved successfully! Both analysts agreed on: ${data.finalDecision}. Sent to QSA Dashboard.`,
          6000
        );
      } else if (data.status === 'conflict') {
        showWarning(
          `Conflict created for Job ID ${jobId}. Different decisions detected. Sent to QSA for resolution.`,
          6000
        );
      }

      setTimeout(() => {
        handleNewSearch();
      }, 1500);
    } catch (error) {
      console.error('Confirmation error:', error);
      showError('Error submitting confirmation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDecision = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/jobs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          analyst: user.username,
          decision: finalDecision,
        }),
      });

      const data = await response.json();

      showSuccess(
        `Job submitted successfully! First decision submitted for Job ID ${jobId}. Waiting for second analyst confirmation.`,
        5000
      );

      setTimeout(() => {
        handleNewSearch();
      }, 1500);
    } catch (error) {
      console.error('Submit error:', error);
      showError('Error submitting decision. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
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

      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Job Alignment System
          </h1>
          <p className='text-gray-600 mt-2'>Analyst: {user.username}</p>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              router.push('/login');
            }}
            className='mt-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer'
          >
            Logout
          </button>
        </div>

        {currentStep === 'search' && (
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Search Job ID
              </h2>

              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='jobId'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Job ID
                  </label>
                  <div className='flex gap-3'>
                    <input
                      type='text'
                      id='jobId'
                      value={jobId}
                      onChange={e => setJobId(e.target.value)}
                      placeholder='Paste Job ID here (e.g., 615651774629057)'
                      className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={loading}
                      className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer'
                    >
                      <Search size={16} />
                      {loading ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {searchResult && (
              <div className='mt-6 bg-white rounded-lg shadow-md p-6'>
                {searchResult.status === 'completed' ? (
                  <div className='flex items-start gap-3'>
                    <Check className='text-green-500 mt-1' size={20} />
                    <div>
                      <h3 className='text-lg font-semibold text-green-700 mb-2'>
                        Job ID Already Completed
                      </h3>
                      <p className='text-gray-700 mb-2'>
                        <strong>Status:</strong>{' '}
                        {searchResult.jobStatus === 'resolved'
                          ? 'Resolved (Agreed)'
                          : 'Conflict (Disagreed)'}
                      </p>
                      <p className='text-gray-700 mb-4'>
                        <strong>Final Decision:</strong>{' '}
                        {searchResult.finalDecision}
                      </p>
                      <button
                        onClick={handleNewSearch}
                        className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer'
                      >
                        Search Next Job ID
                      </button>
                    </div>
                  </div>
                ) : searchResult.status === 'new' ? (
                  <div className='flex items-start gap-3'>
                    <AlertCircle className='text-blue-500 mt-1' size={20} />
                    <div>
                      <h3 className='text-lg font-semibold text-blue-700 mb-2'>
                        New Job ID - First Analysis
                      </h3>
                      <p className='text-gray-700 mb-4'>
                        This Job ID needs analysis. Proceed with decision tree.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {currentStep === 'confirmation' && searchResult && (
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white rounded-lg shadow-md p-6'>
              <div className='flex items-center gap-3 mb-6'>
                <Users className='text-orange-500' size={24} />
                <h2 className='text-2xl font-bold text-gray-800'>
                  Previous Analysis Found
                </h2>
              </div>

              <div className='space-y-6'>
                <div className='p-4 bg-orange-50 border border-orange-200 rounded-lg'>
                  <h3 className='font-semibold text-orange-800 mb-3'>
                    Previous Decision:
                  </h3>
                  <div className='space-y-2 text-sm'>
                    <p>
                      <strong>Analyst:</strong> {searchResult.firstAnalyst}
                    </p>
                    <p>
                      <strong>Decision:</strong> {searchResult.firstDecision}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Date(searchResult.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                  <h3 className='font-semibold text-blue-800 mb-3'>
                    Confirmation Required:
                  </h3>
                  <p className='text-blue-700 mb-4'>
                    Do you agree with this decision? If you're uncertain, please
                    consult a QSA or Wizer for guidance before proceeding.
                  </p>

                  <div className='flex gap-3'>
                    <button
                      onClick={() => handleConfirmation(true)}
                      disabled={loading}
                      className='flex-1 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 font-medium cursor-pointer'
                    >
                      {loading ? 'Processing...' : '✅ Yes, I Agree'}
                    </button>
                    <button
                      onClick={() => setCurrentStep('decision-tree')}
                      disabled={loading}
                      className='flex-1 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 font-medium cursor-pointer'
                    >
                      ❌ No, I Disagree
                    </button>
                  </div>
                </div>

                <div className='text-center'>
                  <button
                    onClick={handleNewSearch}
                    className='px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md cursor-pointer'
                  >
                    ← Back to Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'decision-tree' && (
          <DecisionTreeComponent
            jobId={jobId}
            onNewSearch={handleNewSearch}
            onDecisionComplete={decision => {
              setFinalDecision(decision);

              if (searchResult && searchResult.status === 'second_analysis') {
                handleConfirmation(false);
              } else {
                setCurrentStep('final-confirmation');
              }
            }}
          />
        )}

        {currentStep === 'final-confirmation' && (
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Confirm Decision
              </h2>

              <div className='space-y-4'>
                <div className='p-4 bg-blue-50 rounded-lg'>
                  <p className='text-sm font-medium text-blue-800 mb-2'>
                    Job ID:
                  </p>
                  <p className='text-blue-900 font-mono'>{jobId}</p>
                </div>

                <div className='p-4 bg-green-50 rounded-lg'>
                  <p className='text-sm font-medium text-green-800 mb-2'>
                    Final Decision:
                  </p>
                  <p className='text-green-900'>{finalDecision}</p>
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={handleSubmitDecision}
                    disabled={loading}
                    className='flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 cursor-pointer'
                  >
                    {loading ? 'Submitting...' : 'Submit Decision'}
                  </button>
                  <button
                    onClick={() => setCurrentStep('decision-tree')}
                    className='px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer'
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
