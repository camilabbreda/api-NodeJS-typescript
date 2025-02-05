import { BadRequestException } from '../../../src/common/error/bad-request-esception';
import { iUser } from '../../../src/common/interface/entity-pg-user';
import validation, {
  emailValidation,
  isJsonValid,
  usernameValidation,
} from '../../../src/common/util/function/validation';
import RepositoryPG from '../../../src/domain/repository/repository-pg-user';

jest.mock('../../../src/domain/repository/repository-pg-user', () => ({
  getUserByUsername: jest.fn(),
  getUserByEmail: jest.fn(),
}));

describe('validation', () => {
  const validUser: iUser = {
    username: 'validuser',
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw BadRequestException if any required fields are missing', async () => {
    const invalidUser = { ...validUser, username: '' };
    await expect(validation(invalidUser, 'POST')).rejects.toThrow(
      new BadRequestException(
        'Please, inform all data from user (username, firstname, lastname, email, password )'
      )
    );
  });

  it('should throw BadRequestException if username is invalid', async () => {
    const invalidUser = { ...validUser, username: 'invalid User' };
    await expect(validation(invalidUser, 'POST')).rejects.toThrow(
      new BadRequestException(
        'Please, username should not have any blank spaces or camelcase.'
      )
    );
  });

  it('should throw BadRequestException if email is invalid', async () => {
    const invalidUser = { ...validUser, email: 'invalidemail' };
    await expect(validation(invalidUser, 'POST')).rejects.toThrow(
      new BadRequestException(
        `Sorry, the email ${invalidUser.email} is not valid.`
      )
    );
  });

  it('should throw BadRequestException if username is already registered', async () => {
    (RepositoryPG.getUserByUsername as jest.Mock).mockResolvedValue(validUser);
    (RepositoryPG.getUserByEmail as jest.Mock).mockResolvedValue(undefined);
    await expect(validation(validUser, 'POST')).rejects.toThrow(
      new BadRequestException(
        `Sorry, the username ${validUser.username} is already registered.`
      )
    );
  });

  it('should throw BadRequestException if email is already registered', async () => {
    (RepositoryPG.getUserByUsername as jest.Mock).mockResolvedValue(undefined);
    (RepositoryPG.getUserByEmail as jest.Mock).mockResolvedValue(validUser);
  
    const result = await RepositoryPG.getUserByEmail(`${validUser.email}`);
    expect(result).toBe(validUser); 
  
    await expect(validation(validUser, 'POST')).rejects.toThrow(
      new BadRequestException(
        `Sorry, the email ${validUser.email} is already registered.`
      )
    );
  });

  it('should not throw any exception if the user data is valid', async () => {
    (RepositoryPG.getUserByUsername as jest.Mock).mockResolvedValue(
      undefined
    );
    (RepositoryPG.getUserByEmail as jest.Mock).mockResolvedValue(undefined);
    await expect(validation(validUser, 'POST')).resolves.not.toThrow();
  });
});

describe('isJsonValid', () => {
  it('should return true for valid JSON strings', () => {
    const validJson = '{"name":"John", "age":30}';
    expect(isJsonValid(validJson)).toBe(true);
  });

  it('should return false for invalid JSON strings', () => {
    const invalidJson = '{"name": "John", "age": 30';
    expect(isJsonValid(invalidJson)).toBe(false);
  });
});

describe('userNameValidation', () => {
  it('should return false if the username contains spaces', () => {
    expect(usernameValidation('invalid user')).toBe(false);
  });

  it('should return false if the username contains camelcase', () => {
    expect(usernameValidation('invalidUser')).toBe(false);
  });

  it('should return true if the username is valid (no spaces, no camelcase)', () => {
    expect(usernameValidation('validuser')).toBe(true);
  });
});

describe('emailValidation', () => {
  it('should return false for invalid email formats', () => {
    expect(emailValidation('invalidemail')).toBe(false);
    expect(emailValidation('invalid@domain')).toBe(false);
    expect(emailValidation('invalid@domain.')).toBe(false);
  });

  it('should return true for valid email formats', () => {
    expect(emailValidation('johndoe@example.com')).toBe(true);
  });
});
