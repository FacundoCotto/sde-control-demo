import React, { useEffect, useState } from 'react'
import { UserData } from '../lib/realtimeDb'
import { ref, onValue } from 'firebase/database'
import { db } from '../lib/firebase'

function useUsers() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
            const usersRef = ref(db, 'usuarios');
            const unsubscribe = onValue(usersRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const usersList = Object.entries(data).map(([id, userData]) => ({
                        id,
                        ...(userData as UserData)
                    }));
                    setUsers(usersList);
                } else {
                    setUsers([]);
                }
                setLoading(false);
            });

            return () => unsubscribe()
        }, [])

        return { users, loading }
}

export default useUsers

