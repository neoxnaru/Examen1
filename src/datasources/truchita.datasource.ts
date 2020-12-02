import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'truchita',
  connector: 'mssql',
  url: 'mssql://Leonardo94_SQLLogin_1:l2ol8h1pqa@Supermercado2.mssql.somee.com/Supermercado2',
  host: 'Supermercado2.mssql.somee.com',
  port: 1433,
  user: 'Leonardo94_SQLLogin_1',
  password: 'l2ol8h1pqa',
  database: 'Supermercado2'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TruchitaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'truchita';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.truchita', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
