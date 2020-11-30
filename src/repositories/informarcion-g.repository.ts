import {DefaultCrudRepository} from '@loopback/repository';
import {InformarcionG, InformarcionGRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InformarcionGRepository extends DefaultCrudRepository<
  InformarcionG,
  typeof InformarcionG.prototype.informarcionGId,
  InformarcionGRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(InformarcionG, dataSource);
  }
}
