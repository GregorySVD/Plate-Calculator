// src/record/record.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { Record } from './record.schema';

describe('RecordController', () => {
  let controller: RecordController;
  let service: RecordService;

  // Mock implementation of RecordService
  const mockRecordService = {
    findAll: jest.fn().mockResolvedValue([]), // Mock empty array for findAll
    findOne: jest.fn().mockResolvedValue(null), // Mock null for findOne
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
      const mockRecords: Record[] = [
        {
          numberOfProbe: 1,
          date: new Date(),
          plateValue: 10,
          grain: 'continuous',
          ground: 'field1',
          resultIs: 5,
          resultEvd: 2,
        },
        {
          numberOfProbe: 2,
          date: new Date(),
          plateValue: 20,
          grain: 'discontinuous',
          ground: 'field2',
          resultIs: 10,
          resultEvd: 4,
        },
      ];
      mockRecordService.findAll.mockResolvedValueOnce(mockRecords);

      const result = await controller.findAll();
      expect(result).toEqual(mockRecords);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single record', async () => {
      const mockRecord: Record = {
        numberOfProbe: 1,
        date: new Date(),
        plateValue: 10,
        grain: 'continuous',
        ground: 'field1',
        resultIs: 5,
        resultEvd: 2,
      };
      mockRecordService.findOne.mockResolvedValueOnce(mockRecord);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockRecord);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should return null if no record is found', async () => {
      const result = await controller.findOne('non-existent-id');
      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('non-existent-id');
    });
  });
});
