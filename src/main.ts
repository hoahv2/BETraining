import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphPublisher } from '@nestjs/devtools-integration';

type CS = 'push' | 'pull';
async function bootstrap() {
  const shouldPublishGraph = process.env.PUBLISH_GRAPH === "true";

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    preview: shouldPublishGraph,
  });

  if (shouldPublishGraph) {
    await app.init();

    const publishOptions = {
      apiKey: process.env.DEVTOOLS_API_KEY,
      repository: process.env.REPOSITORY_NAME,
      owner: process.env.GITHUB_REPOSITORY_OWNER,
      sha: process.env.COMMIT_SHA,
      target: process.env.TARGET_SHA,
      trigger: process.env.GITHUB_BASE_REF ? 'push' : 'pull' as CS,
      branch: process.env.BRANCH_NAME,
    };
    // const publishOptions = { } // NOTE: this options object will vary depending on the CI/CD provider you're using
    const graphPublisher = new GraphPublisher(app);
    await graphPublisher.publish(publishOptions);

    await app.close();
  } else {
    await app.listen(3000);
  }
}

bootstrap();
