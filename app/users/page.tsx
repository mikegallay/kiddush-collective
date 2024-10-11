// 'use client';

// import { useRouter } from 'next/router';
// import {data} from '@/app/data/dummydata';
// import {UserProps} from '@/app/data/globalProps'

// export default function UserPage({ params }: UserProps) {
//     const { slug } = params;  // Dynamic slug from the URL

//     if (!slug) {
//         return <div>Loading...</div>;
//     }
//     // const {id} = slug;
//     const user = (data as UserProps[]).find((user: UserProps) => user.id === slug);
//     if (!user) {
//         return <div>User not found</div>;
//     }
//     return (
//         <div>
//             <h1>{user.id} - {user.first_name} {user.last_initial}</h1>
//             <p>{user.email}</p>
//             <p>{user.influence_level}</p>
//             <p>{user.celestial_gfather_from}</p>
//         </div>     
//     )
// }