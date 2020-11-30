import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'truchita',
  connector: 'mssql',
  url: 'mssql://prueba:joncena1234@LEONARDO/Supermercado2',
  host: 'LEONARDO',
  port: 1433,
  user: 'prueba',
  password: 'joncena1234',
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
