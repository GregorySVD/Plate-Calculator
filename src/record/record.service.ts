import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordDocument } from './record.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  async findAll(): Promise<Record[]> {
    return await this.recordModel.find().exec();
  }
  async findOne(id: string): Promise<Record> {
    return await this.recordModel.findById(id).exec();
  }
}
