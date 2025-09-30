// // hooks/useApiClient.ts
// 'use client';

// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export const useApiClient = () => {
//   const { data: session } = useSession();
//   const [apiClient, setApiClient] = useState(axios.create());

//   useEffect(() => {
//     const client = axios.create({
//       baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     setApiClient(client);
//   }, [session]);

//   return apiClient;
// };