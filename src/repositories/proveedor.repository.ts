import {DefaultCrudRepository} from '@loopback/repository';
import {Proveedor, ProveedorRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.proveedorId,
  ProveedorRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(Proveedor, dataSource);
  }
}
