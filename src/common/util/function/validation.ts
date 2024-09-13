import RepositoryPG from '../../../domain/repository/repository-pg-user';
import { BadRequestException } from '../../error/bad-request-esception';
import { iUser } from '../../interface/entity-pg-user';

export default async function validation(body:iUser){
  if (
    !body.username ||
    !body.firstname ||
    !body.lastname ||
    !body.email ||
    !body.password
  ) {
    throw new BadRequestException(
      'Please, inform all data from user (username, firstname, lastname, email, password )'
    );
  }

  const isValidUsername = usernameValidation(body.username);
  if(!isValidUsername){
    throw new BadRequestException(
      'Please, username should not have any blank spaces or camelcase.'
    );
  }
  const isEmailValid = emailValidation(body.email.toLocaleLowerCase())

  if(!isEmailValid){
    throw new BadRequestException(
      `Sorry, the email ${body.email} is not valid.`
    );
  }

  const existUsername = await RepositoryPG.getUserByUsername(body.username);
  if (existUsername) {
    throw new BadRequestException(
      `Sorry, the username ${body.username} is already registered.`
    );
  }

  const existEmail = await RepositoryPG.getUserByEmail(body.email);
  console.log('existEmail', existEmail);
  if(existEmail){
    throw new BadRequestException(
      `Sorry, the email ${body.email} is already registered.`
    );
  }
}

export function isJsonValid(jsonstring: string): boolean {
  try {
    JSON.parse(jsonstring);
    return true;
  } catch (error) {
    return false;
  }
}

export function usernameValidation(username: string):boolean {
  const includesSpace = username.includes(' ');
  const includesCamelCase = /[A-Z]/.test(username)
  if (includesSpace || includesCamelCase) {
   return false;
  }

  return true;
}

export function emailValidation(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}