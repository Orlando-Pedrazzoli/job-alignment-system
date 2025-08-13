import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se usuário já está logado
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'analyst') {
        router.push('/analyst');
      } else if (user.role === 'qsa') {
        router.push('/qsa/dashboard');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          Job Alignment System
        </h1>
        <p className='text-gray-600'>Redirecting...</p>
      </div>
    </div>
  );
}
