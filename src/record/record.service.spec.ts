// src/record/record.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

describe('RecordController', () => {
  let controller: RecordController;
  let service: RecordService;

  // Mocking RecordService
  const mockRecordService = {
    findAll: jest.fn().mockResolvedValue([]), // Return empty array for findAll
    findOne: jest.fn().mockResolvedValue(null), // Return null for findOne
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordController],
      providers: [
        {
          provide: RecordService,
          useValue: mockRecordService,
        },
      ],
    }).compile();

    controller = module.get<RecordController>(RecordController);
    service = module.get<RecordService>(RecordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of records', async () => {
      mockRecordService.findAll.mockResolvedValueOnce([{ numberOfProbe: 1 }]);
      const result = await controller.findAll();
      expect(result).toEqual([{ numberOfProbe: 1 }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single record', async () => {
      mockRecordService.findOne.mockResolvedValueOnce({ numberOfProbe: 1 });
      const result = await controller.findOne('1');
      expect(result).toEqual({ numberOfProbe: 1 });
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should return null if no record is found', async () => {
      const result = await controller.findOne('non-existent-id');
      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('non-existent-id');
    });
  });
});
