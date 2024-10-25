import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
