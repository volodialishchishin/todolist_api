import { DbConfig } from '../Interfaces/enties.interfaces';

export interface IConfigService {
  get: (key: string) => string;
  getDBConfig: () => DbConfig
}
