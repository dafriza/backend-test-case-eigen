import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { dir, log } from 'console';
import { AuthService } from 'src/app/auth/auth.service';
import { UserEntity } from 'src/app/module/users/domain/entities/user.entitiy';
import { UserRepository } from 'src/app/module/users/infra/repositories/user.repository';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    findUser: jest.fn(), // Mock method findUser dari UserRepository
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should throw an error if user is not found', async () => {
      // mockUserRepository.findUser.mockResolvedValue(null);
      const userEntity = new UserEntity({
        username: 'testuser',
        password: '1',
      });
      await expect(authService.login(userEntity)).rejects.toThrowError(
        'User Not Found!',
      );
    });

    it('should throw an error if password is incorrect', async () => {
      const mockUser = {
        username: 'Aditya',
        password: await bcrypt.hash('1', 10),
      };

      mockUserRepository.findUser.mockResolvedValue(mockUser);
      // Mock bcrypt.compare untuk membandingkan plainTextPassword dengan hashedPassword
      const plainTextPassword = '2'; // Password yang salah
      const userEntity = new UserEntity({
        username: 'Aditya',
        password: plainTextPassword,
      });
      await expect(authService.login(userEntity)).rejects.toThrowError(
        "Password isn't valid",
      );
    });

    it('should return user data if credentials are valid', async () => {
      const mockUser = {
        username: 'Aditya',
        password: bcrypt.hash('1', 10),
      };
      mockUserRepository.findUser.mockResolvedValue(mockUser);
      const userEntity = new UserEntity({
        username: 'Aditya',
        password: '1',
      });
      const result = await authService.login(userEntity);

      expect(result).toEqual(mockUser);
    });
  });
});
