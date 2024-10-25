import { Controller, Get, Param } from '@nestjs/common';
import { RecordService } from './record.service';
import { Record } from './record.schema';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get() // GET all records
  async findAll(): Promise<Record[]> {
    return this.recordService.findAll();
  }
  @Get(':id') // GET single record by id
  async findOne(@Param('id') id: string): Promise<Record> {
    return this.recordService.findOne(id);
  }
}
