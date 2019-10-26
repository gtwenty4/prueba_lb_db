import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ordenes} from './ordenes.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'usuario'}}
})
export class Usuario extends Entity {
  @property({
    type: Number,
    id: true,
    postgresql: {"columnName":"idusuario","dataType":"numeric","dataLength":null,"dataPrecision":null,"dataScale":null,"nullable":"NO"},
  })
  idusuario?: Number;

  @property({
    type: String,
    required: true,
    postgresql: {"columnName":"nombre","dataType":"name","dataLength":null,"dataPrecision":null,"dataScale":null,"nullable":"NO"},
  })
  nombre: String;

  @hasMany(() => Ordenes ,{keyTo: 'fkusuario'})
  ordenes: Ordenes[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
