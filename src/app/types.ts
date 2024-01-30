import { atom } from 'jotai';

export type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const atomUsers = atom<UserData[]>([]);
export const atomPage = atom(1);
export const atomItemOpen = atom(false);
export const atomCurrentItem = atom<UserData>({
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar: '',
});
export const atomDeletedUsers = atom<number[]>([]);
export const atomCreatedUsers = atom<UserData[]>([]);
export const atomEnableUpdate = atom(false);
export const atomNewUsers = atom<UserData[]>([]);
export const defaultAvatar = 'https://reqres.in/img/faces/4-image.jpg';
export const atomToken = atom('QpwL5tke4Pnpja7X4');
export const demoToken = 'QpwL5tke4Pnpja7X4';

//just for the demo
export const email = 'eve.holt@reqres.in';
export const password = 'cityslicka';
