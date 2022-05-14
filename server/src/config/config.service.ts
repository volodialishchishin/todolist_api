import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { injectable } from 'inversify';
import { IConfigService } from './config.service.interface';

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
}
