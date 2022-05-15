import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { DbConfig } from '../Interfaces/enties.interfaces';

@injectable()
export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput;

  constructor() {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      console.log('.env was not found');
    } else {
      console.log('config was created');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }

  getDBConfig():DbConfig {
    return {
      user: this.get('USER'),
      password: this.get('PASSWORD'),
      host: this.get('HOST'),
      port: Number(this.get('DBPORT')),
      database: this.get('DATABASE'),
    };
  }
}
