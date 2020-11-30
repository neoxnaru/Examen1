import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Informarcion_G'}}
})
export class InformarcionG extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'Informarcion_GId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  informarcionGId?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'telefono', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'direccion', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  direccion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InformarcionG>) {
    super(data);
  }
}

export interface InformarcionGRelations {
  // describe navigational properties here
}

export type InformarcionGWithRelations = InformarcionG & InformarcionGRelations;
