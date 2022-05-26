import { Container } from 'inversify';
import { App } from './app';
import { appBindings } from './Injection/injection';
import { TYPES } from './Injection/types';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

async function bootstrap() : Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  await app.init();
  return { appContainer, app };
}

export const boot = bootstrap();
