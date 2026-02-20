import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', () => {
      const result = controller.create({ title: 'Test todo' });
      expect(result).toEqual({
        id: 1,
        title: 'Test todo',
        description: undefined,
        completed: false,
      });
    });

    it('should create a todo with description', () => {
      const result = controller.create({
        title: 'Test todo',
        description: 'A description',
      });
      expect(result).toEqual({
        id: 1,
        title: 'Test todo',
        description: 'A description',
        completed: false,
      });
    });
  });

  describe('findAll', () => {
    it('should return an empty array initially', () => {
      expect(controller.findAll()).toEqual([]);
    });

    it('should return all created todos', () => {
      controller.create({ title: 'Todo 1' });
      controller.create({ title: 'Todo 2' });
      const todos = controller.findAll();
      expect(todos).toHaveLength(2);
      expect(todos[0].title).toBe('Todo 1');
      expect(todos[1].title).toBe('Todo 2');
    });
  });
});
