import {DefaultCrudRepository} from '@loopback/repository';
import {Pedidos, PedidosRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PedidosRepository extends DefaultCrudRepository<
  Pedidos,
  typeof Pedidos.prototype.pedidoId,
  PedidosRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(Pedidos, dataSource);
  }
}
