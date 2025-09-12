import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: {
    findOneBy: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(async () => {
    userRepository = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      userRepository.findOneBy.mockResolvedValue(null); // simulando que o user não existe
      userRepository.create.mockImplementation((dto: CreateUserDto) => dto);
      userRepository.save.mockImplementation((dto: CreateUserDto) => ({
        id: 1,
        ...dto,
      }));

      const user: CreateUserDto = await service.create({
        name: 'John Doe',
        email: 'xgV0t@example.com',
        password: '123456',
      });

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: 'xgV0t@example.com',
      });
      expect(userRepository.save).toHaveBeenCalled();
      expect(user.password).not.toBe('123456'); // senha deve estar criptografada
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email', 'xgV0t@example.com');
    });
  });
  describe('update', () => {});
  describe('delete', () => {});
  describe('findAll', () => {});
  describe('findOne', () => {});
  describe('findByEmail', () => {});
});
