// 'use client';
import {data} from '@/app/data/dummydata';
import {UserProps} from '@/app/data/globalProps'

export default function Page({ params }: { params: { slug: string } }) {
    const user = (data as UserProps[]).find((user: UserProps) => user.id === params.slug);


    if (!params.slug) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div>
            <h1>{user.id} - {user.first_name} {user.last_initial}</h1>
            <p>{user.email}</p>
            <p>{user.influence_level}</p>
            <p>{user.celestial_gfather_from}</p>
        </div>     
    )
}