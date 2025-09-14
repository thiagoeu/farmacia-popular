import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginateQuery } from 'nestjs-paginate';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: any;
  let mockQueryBuilder: any;

  beforeEach(async () => {
    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    };

    userRepository = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(() => mockQueryBuilder),
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

  // CREATE
  describe('create', () => {
    it('should create a user', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      userRepository.create.mockImplementation((dto: CreateUserDto) => dto);
      userRepository.save.mockImplementation((dto: CreateUserDto) => ({
        id: 1,
        ...dto,
      }));

      const user = await service.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      });

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: 'john@example.com',
      });
      expect(user).toHaveProperty('id');
      expect(user.email).toBe('john@example.com');
      expect(user.password).not.toBe('123456'); // password should be hashed
    });

    it('should throw an error if user already exists', async () => {
      userRepository.findOneBy.mockResolvedValue({ id: 1 });

      await expect(
        service.create({
          name: 'Existing User',
          email: 'existing@example.com',
          password: '123456',
        }),
      ).rejects.toThrow(ConflictException);

      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  // UPDATE
  describe('update', () => {
    it('should update a user', async () => {
      userRepository.findOneBy.mockResolvedValue({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
      });

      userRepository.update.mockResolvedValue({ affected: 1 });

      const dto: UpdateUserDto = {
        name: 'Jane Smith',
        password: 'newpass',
      };

      const result = await service.update(1, dto);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(userRepository.update).toHaveBeenCalled();
      expect(result?.message).toBe('Usuário atualizado com sucesso');
    });

    it('should throw error if user not found', async () => {
      userRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(1, { name: 'New' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  // REMOVE
  describe('remove', () => {
    it('should remove user', async () => {
      userRepository.findOneBy.mockResolvedValue({ id: 1 });
      userRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(result).toEqual({ message: 'Usuário removido com sucesso' });
    });

    it('should throw error if user not found', async () => {
      userRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(ConflictException);
    });
  });

  // FIND ONE
  describe('findOne', () => {
    it('should return a user without password and refreshToken', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_pass',
        refreshToken: 'some_token',
      };

      userRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should throw error if user not found', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(ConflictException);
    });
  });

  // FIND BY EMAIL
  describe('findByEmail', () => {
    it('should return a user', async () => {
      const user = {
        id: 1,
        name: 'Test',
        email: 'test@example.com',
      };

      userRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(user);
    });

    it('should throw error if user not found', async () => {
      userRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findByEmail('notfound@example.com')).rejects.toThrow(
        ConflictException,
      );
    });
  });

  // FIND ALL (paginate)
  describe('findAll', () => {
    it('should return paginated users', async () => {
      // sobrescrevendo mock só para este teste
      mockQueryBuilder.getManyAndCount.mockResolvedValueOnce([
        [
          {
            id: 44,
            name: '01',
            email: '1@email.com',
            role: 'admin',
            createdAt: new Date('2025-09-07T05:44:05.228Z'),
            updatedAt: new Date('2025-09-07T05:44:05.228Z'),
          },
          {
            id: 45,
            name: 'jessica',
            email: 'jessica@email.com',
            role: 'usuario',
            createdAt: new Date('2025-09-08T03:33:58.793Z'),
            updatedAt: new Date('2025-09-08T03:33:58.793Z'),
          },
        ],
        2, // total count
      ]);

      const query: PaginateQuery = {
        page: 1,
        limit: 5,
        sortBy: [['name', 'ASC']] as const,
        search: '',
        filter: {},
        path: '/users',
      };

      const result = await service.findAll(query);

      expect(result.data).toHaveLength(2);
      expect(result.meta.totalItems).toBe(2);
      expect(result.meta.currentPage).toBe(1);
      expect(result.links.current).toContain('/users?page=1&limit=5');
    });
  });
});
