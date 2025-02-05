import RepositoryPG from '../../../domain/repository/repository-pg-user';
import { BadRequestException } from '../../error/bad-request-esception';
import { iUser } from '../../interface/entity-pg-user';

export default async function validation(body: iUser, method: 'PUT' | 'POST', id?:string) {
  switch (method) {
  case 'POST':
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
    break;
  case 'PUT':
    if (
      !Object.keys(body).length ||
        (!body.username &&
          !body.firstname &&
          !body.lastname &&
          !body.email &&
          !body.password)
    ) {
      throw new BadRequestException(
        'Please, inform at least one data from user (username, firstname, lastname, email, password).'
      );
    }
    if(!id){
      throw new BadRequestException(
        'Please, inform the user id.'
      );
    }
    break;
  default:
    throw new BadRequestException('Unknown method');
  }
  if (body.username) {
    const isValidUsername = usernameValidation(body.username);
    if (!isValidUsername) {
      throw new BadRequestException(
        'Please, username should not have any blank spaces or camelcase.'
      );
    }
    const isRegisteredUsername = await RepositoryPG.getUserByUsername(
      body.username
    );
    if (isRegisteredUsername) {
      throw new BadRequestException(
        `Sorry, the username ${body.username} is already registered.`
      );
    }
  }
  if (body.email) {
    const isEmailValid = emailValidation(body.email.toLocaleLowerCase());
    if (!isEmailValid) {
      throw new BadRequestException(
        `Sorry, the email ${body.email} is not valid.`
      );
    }
    const isRegisteredEmail = await RepositoryPG.getUserByEmail(body.email);
    if (isRegisteredEmail) {
      throw new BadRequestException(
        `Sorry, the email ${body.email} is already registered.`
      );
    }
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

export function usernameValidation(username: string): boolean {
  const includesSpace = username.includes(' ');
  const includesCamelCase = /[A-Z]/.test(username);
  if (includesSpace || includesCamelCase) {
    return false;
  }

  return true;
}

export function emailValidation(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
