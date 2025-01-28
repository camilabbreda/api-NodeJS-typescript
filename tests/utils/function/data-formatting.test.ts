import { iUser } from '../../../src/common/interface/entity-pg-user';
import dataFormatting from '../../../src/common/util/function/data-formatting';

describe('dataFormatting', () => {
  it('should format the username, firstname, lastname, and email to lowercase', () => {
    const input: iUser = {
      username: 'User123',
      firstname: 'John',
      lastname: 'Doe',
      email: 'TEST@EMAIL.COM',
      password: 'securePassword123',
    };

    const expectedOutput: iUser = {
      username: 'user123',
      firstname: 'john',
      lastname: 'doe',
      email: 'test@email.com',
      password: 'securePassword123',
    };

    const result = dataFormatting(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle undefined values', () => {
    const input: iUser = {
      username: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: 'securePassword123',
    };

    const expectedOutput: iUser = {
      username: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: 'securePassword123',
    };

    const result = dataFormatting(input);

    expect(result).toEqual(expectedOutput);
  });
});
