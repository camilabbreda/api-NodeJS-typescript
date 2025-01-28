import { iUser } from '../../interface/entity-pg-user';

export default function dataFormatting(data: iUser): iUser {
  const user: iUser = {};
  user.username = data.username?.toLocaleLowerCase();
  user.firstname = data.firstname?.toLocaleLowerCase();
  user.lastname = data.lastname?.toLocaleLowerCase();
  user.email = data.email?.toLocaleLowerCase();
  user.password = data.password;

  return user;
}
