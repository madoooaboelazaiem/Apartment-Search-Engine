const { clearDatabase, dbDisconnect, dbConnect } = require('./__dbHandler');
const { userResolvers } = require('../resolvers/userResolvers');

jest.mock('../utils/geocoder', () => ({
  ...jest.requireActual('../utils/geocoder'),
  getLocationFromLonLat: jest
    .fn()
    .mockImplementationOnce(() => {
      return {
        success: true,
        data: [{ city: 'cologne', country: 'germany' }],
      };
    })
    .mockImplementationOnce(() => {
      return {
        success: true,
        data: [{ city: 'cologne', country: 'germany' }],
      };
    }),
}));

describe('User tests', () => {
  let accountInput = {
    username: 'test',
    email: 'test@homealike.com',
    mobile: '+1233634757',
    password: '12345678',
    confirmPassword: '12345678',
    location: [6.953101, 50.935173],
  };
  beforeAll(async () => {
    await dbConnect();
  }, 60000);
  afterAll(async () => {
    await clearDatabase();
    await dbDisconnect();
  }, 60000);
  it('should fail to register a user because no input given', async () => {
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: null,
    });
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('PARAMS_MISSING');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should fail to register a user because no username given', async () => {
    let failedInput = { ...accountInput };
    failedInput.username = undefined;
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...failedInput },
    });
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('PARAMS_MISSING');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should fail to register a user because no email given', async () => {
    let failedInput = { ...accountInput };
    failedInput.email = undefined;
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...failedInput },
    });
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('PARAMS_MISSING');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should fail to register a user because no password given', async () => {
    let failedInput = { ...accountInput };
    failedInput.password = undefined;
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...failedInput },
    });
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('PARAMS_MISSING');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should fail to register a user because location not given', async () => {
    let failedInput = { ...accountInput };
    failedInput.location = undefined;
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...failedInput },
    });
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('PARAMS_MISSING');
    expect(createUser.statusCode).toEqual(400);
  });

  it('should fail to register a user because location does is not consisting of two fields', async () => {
    let failedInput = { ...accountInput };
    failedInput.location = [31];
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...failedInput },
    });
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('WRONG_LOCATION');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should fail to register a user because password mismatch', async () => {
    let failedInput = { ...accountInput };
    failedInput.confirmPassword = '12314';
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...failedInput },
    });
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('PASSWORD_MISMATCH');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should succeed to register a user', async () => {
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...accountInput },
    });
    expect(createUser.success).toBe(true);
    expect(createUser.message).toEqual('USER_CREATED_SUCCESSFULLY');
    expect(createUser.statusCode).toEqual(201);
    expect(createUser.user.username).toEqual(accountInput.username);
    expect(createUser.user.email).toEqual(accountInput.email);
    expect(createUser.user.mobile).toEqual(accountInput.mobile);
  });
  it('should fail to register the user because the username is already created', async () => {
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...accountInput },
    });
    accountInput.username = 'uniqueUsername';
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('ACCOUNT_EXISTS');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should fail to register the user because the email is already created', async () => {
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...accountInput },
    });
    accountInput.email = 'uniqueEmail@homealike.com';
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('ACCOUNT_EXISTS');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should fail to register the user because the number is already created', async () => {
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...accountInput },
    });
    accountInput.mobile = '12412412414';
    expect(createUser.success).toBe(false);
    expect(createUser.message).toEqual('ACCOUNT_EXISTS');
    expect(createUser.statusCode).toEqual(400);
  });
  it('should succeed to register a new user', async () => {
    const createUser = await userResolvers.Mutation.userRegister(null, {
      input: { ...accountInput },
    });
    expect(createUser.success).toBe(true);
    expect(createUser.message).toEqual('USER_CREATED_SUCCESSFULLY');
    expect(createUser.statusCode).toEqual(201);
    expect(createUser.user.username).toEqual('uniqueusername');
    expect(createUser.user.email).toEqual('uniqueemail@homealike.com');
    expect(createUser.user.mobile).toEqual('12412412414');
  });
});
