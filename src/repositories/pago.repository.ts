import {DefaultCrudRepository} from '@loopback/repository';
import {Pago, PagoRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.pagoId,
  PagoRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(Pago, dataSource);
  }
}
