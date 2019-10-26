import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'ordenes'}}
})
export class Ordenes extends Entity {
  @property({
    type: Number,
    id: true,
    postgresql: {"columnName":"idorden","dataType":"numeric","dataLength":null,"dataPrecision":null,"dataScale":null,"nullable":"NO"},
  })
  idorden: Number;

  @property({
    type: String,
    required: false,
    postgresql: {"columnName":"descripcion","dataType":"name","dataLength":null,"dataPrecision":null,"dataScale":null,"nullable":"YES"},
  })
  descripcion?: String;

  @property({
    type: Number,
    postgresql: {"columnName":"fkusuario","dataType":"numeric","dataLength":null,"dataPrecision":null,"dataScale":null,"nullable":"NO"},
  })
  fkusuario?: Number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ordenes>) {
    super(data);
  }
}

export interface OrdenesRelations {
  // describe navigational properties here
}

export type OrdenesWithRelations = Ordenes & OrdenesRelations;
