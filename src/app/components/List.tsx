import { useAtom } from 'jotai';
import {
  UserData,
  atomCurrentItem,
  atomDeletedUsers,
  atomEnableUpdate,
  atomItemOpen,
} from '../types';
import Item from './Item';
import Pagination from './Pagination';

/* eslint-disable @next/next/no-img-element */

type ListProps = {
  users: UserData[] | undefined;
};

const List = ({ users }: ListProps) => {
  const [, setIsOpen] = useAtom(atomItemOpen);
  const [, setCurrentUser] = useAtom(atomCurrentItem);
  const [deletedUsers] = useAtom(atomDeletedUsers);
  const [, setEnableUpdate] = useAtom(atomEnableUpdate);
  const handleView = (person: UserData) => {
    if (!deletedUsers.includes(person.id)) {
      setEnableUpdate(false);
      setCurrentUser(person);
      setIsOpen(true);
    }
  };
  const handleCreate = () => {
    setCurrentUser({
      id: 0,
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
    });
    setIsOpen(true);
  };
  return (
    <>
      <div>
        <div className='-mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-40 mt-4 flex-shrink-0'>
            <button
              type='button'
              onClick={handleCreate}
              className='relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Create new user
            </button>
          </div>
        </div>

        <ul role='list' className='divide-y divide-gray-100'>
          {users?.map((person) => (
            <li
              key={person.email}
              className={
                deletedUsers.includes(person.id)
                  ? 'opacity-25 flex items-center justify-between gap-x-6 py-5'
                  : 'flex items-center justify-between gap-x-6 py-5'
              }
            >
              <div className='flex min-w-0 gap-x-4'>
                <img
                  className='h-12 w-12 flex-none rounded-full bg-gray-50'
                  src={person.avatar}
                  alt=''
                />
                <div className='min-w-0 flex-auto'>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                    {person.first_name + ' ' + person.last_name}
                  </p>
                  <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                    {person.email}
                  </p>
                </div>
              </div>
              <a
                href={deletedUsers.includes(person.id) ? undefined : '#'}
                onClick={() => handleView(person)}
                className='rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              >
                View
              </a>
            </li>
          ))}
        </ul>

        <Pagination />
        <Item />
      </div>
    </>
  );
};

export default List;
