import {DefaultCrudRepository} from '@loopback/repository';
import {FacturaDet, FacturaDetRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacturaDetRepository extends DefaultCrudRepository<
  FacturaDet,
  typeof FacturaDet.prototype.facturaDetalleId,
  FacturaDetRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(FacturaDet, dataSource);
  }
}
