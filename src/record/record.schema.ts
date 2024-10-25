import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Decimal128 } from 'mongoose';

export type RecordDocument = Record & Document;

//MongosSchema
@Schema()
export class Record {
  @Prop({ required: true })
  numberOfProbe: number;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true })
  plateValue: number;

  @Prop({ enum: ['continuous', 'discontinuous'], required: true })
  grain: 'continuous' | 'discontinuous';

  @Prop({ required: true })
  ground: string;

  @Prop({ required: true })
  resultIs: number;
  @Prop({ required: true })
  resultEvd: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
