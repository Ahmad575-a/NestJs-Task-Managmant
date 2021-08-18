import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
})

const mockUser = {
    username: 'Ahmad',
    id: 'someId',
    password: 'somePassword',
    tasks: []
}

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initialize a NestJs module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
      it('calls TasksRepository.getTasks and return the results',async () =>{
        // expect(tasksRepository.getTasks).not.toHaveBeenCalled();
        tasksRepository.getTasks.mockResolvedValue('someValue')
        const results = await tasksService.getTasks(null, mockUser);
        // expect(tasksRepository.getTasks).toHaveBeenCalled();
        expect(results).toEqual('someValue')
      })
  })
});
