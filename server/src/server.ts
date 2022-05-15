import { Container } from 'inversify';
import { App } from './app';
import { appBindings } from './Injection/injection';
import { TYPES } from './Injection/types';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

function bootstrap() : IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
