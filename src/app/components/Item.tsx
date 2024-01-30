import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment } from 'react';
import {
  atomCurrentItem,
  atomDeletedUsers,
  atomEnableUpdate,
  atomItemOpen,
  atomNewUsers,
  atomPage,
  atomUsers,
  defaultAvatar,
} from '../types';

const Item = () => {
  const [isOpen, setIsOpen] = useAtom(atomItemOpen);
  const [user, setUser] = useAtom(atomCurrentItem);
  const [deletedUsers, setDeletedUsers] = useAtom(atomDeletedUsers);
  const [enableUpdate, setEnableUpdate] = useAtom(atomEnableUpdate);
  const [allUsers, setAllUsers] = useAtom(atomUsers);
  const [newUsers, setNewUsers] = useAtom(atomNewUsers);
  const [, setPage] = useAtom(atomPage);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (user.id > 0 && !deletedUsers.includes(user.id)) {
      const request = new Request(
        `http://localhost:3000/api/deleteUser/${user.id}`,
        {
          method: 'DELETE',
        }
      );
      await fetch(request);
      setDeletedUsers([...deletedUsers, user.id]);
      closeModal();
    }
  };

  const handleCancel = () => {
    setEnableUpdate(false);
    closeModal();
  };

  const handleChange = ({ target: { name, value } }: any) => {
    setUser({
      ...user,
      [name]: value,
    });
    setEnableUpdate(true);
  };

  const handleSubmit = async () => {
    if (
      user.first_name.length > 0 &&
      user.last_name.length > 0 &&
      user.email.length > 2 &&
      enableUpdate
    ) {
      setEnableUpdate(false);
      closeModal();
      if (user.id > 0) {
        // if user exists, need UPDATE
        const request = new Request(
          `http://localhost:3000/api/updateUser/${user.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(user),
          }
        );
        await fetch(request);
        if (newUsers.find((u) => u.id === user.id))
          setNewUsers([...newUsers.map((u) => (u.id === user.id ? user : u))]);
        else
          setAllUsers([...allUsers.map((u) => (u.id === user.id ? user : u))]);
      } else {
        // Create New User
        const request = new Request(`http://localhost:3000/api/createUser`, {
          method: 'POST',
          body: JSON.stringify({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: defaultAvatar,
          }),
        });
        fetch(request)
          .then((response) => response.json())
          .then((data) => {
            const newUser = { ...user, id: data.id, avatar: defaultAvatar };
            setNewUsers([...newUsers, newUser]);
            setPage(3);
          });
      }
    }
  };
  console.log(newUsers);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {user.id === 0 ? 'Create User' : 'View/Update User'}
                  </Dialog.Title>

                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      <label
                        htmlFor='first_name'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        First Name
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          name='first_name'
                          id='first_name'
                          value={user.first_name}
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          placeholder='John'
                          onChange={handleChange}
                        />
                      </div>
                    </p>
                    <p className='text-sm text-gray-500'>
                      <label
                        htmlFor='last_name'
                        className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                      >
                        Last Name
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='last_name'
                          id='last_name'
                          value={user.last_name}
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          placeholder='Johnson'
                          onChange={handleChange}
                        />
                      </div>
                    </p>
                    <p className='text-sm text-gray-500'>
                      <label
                        htmlFor='email'
                        className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                      >
                        Email
                      </label>
                      <div className='mt-1'>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          value={user.email}
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          placeholder='you@example.com'
                          onChange={handleChange}
                        />
                      </div>
                    </p>
                  </div>

                  <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                    <button
                      type='button'
                      onClick={handleDelete}
                      className={
                        user.id === 0
                          ? 'opacity-25 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                          : 'inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                      }
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      className={
                        enableUpdate &&
                        user.first_name.length > 0 &&
                        user.last_name.length > 0 &&
                        user.email.length > 2
                          ? 'mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 sm:ml-3 sm:mt-0 sm:w-auto'
                          : 'opacity-25 mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 sm:ml-3 sm:mt-0 sm:w-auto'
                      }
                      onClick={handleSubmit}
                    >
                      {user.id === 0 ? 'Create' : 'Update'}
                    </button>
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Item;
