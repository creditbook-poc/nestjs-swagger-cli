import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as basicAuth from "express-basic-auth";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerRoute = "/docs";
  const SWAGGER_USERNAME = "swagger";
  const SWAGGER_PASSWORD = "1234";
  const ENVIRONMENT = "sample";
  app.use(
    [swaggerRoute, `${swaggerRoute}/-json`],
    basicAuth({
      challenge: true,
      users: {
        [SWAGGER_USERNAME]: SWAGGER_PASSWORD,
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle(`${ENVIRONMENT} - NestJS-Swagger-CLI-Plugin`)
    .setDescription("The NestJS-Swagger-CLI-Plugin API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addApiKey(null, "internal-api-key")
    .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: `${process.env.ENVIRONMENT} - NestJS-Swagger-CLI-Plugin`,
    swaggerOptions: {
      operationsSorter: "alpha",
      tagsSorter: "alpha",
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerRoute, app, document, customOptions);
  await app.listen(3000);
}
bootstrap();
