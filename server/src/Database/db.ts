import Pool from 'pg';
import { inject, injectable } from 'inversify';
import { TYPES } from '../Injection/types';
import { IConfigService } from '../Config/config.service.interface';

@injectable()
export class DataBase {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {}

  dbInit() {
    return new Pool.Pool(this.configService.getDBConfig());
  }
}
