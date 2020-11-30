import {DefaultCrudRepository} from '@loopback/repository';
import {CuentaCont, CuentaContRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CuentaContRepository extends DefaultCrudRepository<
  CuentaCont,
  typeof CuentaCont.prototype.cuentaContId,
  CuentaContRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(CuentaCont, dataSource);
  }
}
