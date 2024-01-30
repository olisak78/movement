'use client';
import { useAtom } from 'jotai';
import List from './components/List';
import { atomNewUsers, atomPage, atomUsers } from './types';
import { useEffect } from 'react';

const Home = () => {
  const [page] = useAtom(atomPage);
  const [allUsers, setAllUsers] = useAtom(atomUsers);
  const [newUsers] = useAtom(atomNewUsers);

  useEffect(() => {
    fetch(`/api/getUsers/${page}`)
      .then((response) => response.json())
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, [page]);
  console.log(allUsers);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-20'>
      {allUsers && <List users={page < 3 ? allUsers : newUsers} />}
    </main>
  );
};

export default Home;
