import {DefaultCrudRepository} from '@loopback/repository';
import {CatalogoC, CatalogoCRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CatalogoCRepository extends DefaultCrudRepository<
  CatalogoC,
  typeof CatalogoC.prototype.cuentaId,
  CatalogoCRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(CatalogoC, dataSource);
  }
}
