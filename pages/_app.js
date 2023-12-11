import { magic } from '@/lib/magic-client';
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Loading from './components/loading';


export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push('/');
      }
      else {
        router.push('/login');
      }
    }
    checkIfLoggedIn();
  }, []);

  useEffect(() => {

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, [router])

  const handleComplete = () => {
    setIsLoading(false)
  }

  if(isLoading) return < Loading />

  return <Component {...pageProps} />
}
