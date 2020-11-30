import {DefaultCrudRepository} from '@loopback/repository';
import {PedidoDet, PedidoDetRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PedidoDetRepository extends DefaultCrudRepository<
  PedidoDet,
  typeof PedidoDet.prototype.pedidoDetId,
  PedidoDetRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(PedidoDet, dataSource);
  }
}
