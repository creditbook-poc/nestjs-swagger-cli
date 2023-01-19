# nestjs-swagger-cli

How to configure swagger in nestjs with basic auth, this method will generate docs automatically, there wont be need add to decoraters on each route or property.

Install nestjs cli

###### $ npm i -g @nestjs/cli

Create a new project

###### $ nest new project-name

Go to your project folder and then go **_src_** folder you will find **_main.ts_**

###### $ cd project/src

Install nestjs swagger and basic-auth package

###### npm i @nestjs/swagger

###### npm i express-basic-auth

Add these of lines of code in bootstrap function

```
const swaggerRoute = '/docs';
  app.use(
    [swaggerRoute, `${swaggerRoute}/-json`],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(`${process.env.ENVIRONMENT} - cb-main-backend`)
    .setDescription('The cb-main-backend API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(null, 'internal-api-key')
    .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: `${process.env.ENVIRONMENT} - cb-main-backend`,
    swaggerOptions: {
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerRoute, app, document, customOptions);
```

Last step, create a file **_nest-cli.json_** in project folder (outside of src folder, where package.json resides)

Now we need to add swagger plugin, which will generate docs autmatically for us

```
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          " dtoFileNameSuffix": [".dto.ts", ".entity.ts", ".schema.ts"],
          "classValidatorShim": true,
          "introspectComments": true
        }
      }
    ]
  }
}

```

Go to **_http://localhost:3000/docs_** to see documentation, this will prompt a dialog, enter **_Username and Password_**, Now you can see Swagger-Docs, If you want access protected routes, add a bearer token.

## Resources:

This is just basic setup, NestJS and OpenAPI offers a lot customisation.

[NestJS Introduction](https://docs.nestjs.com/)

[NestJS OpenAPI Documentation](https://docs.nestjs.com/openapi/introduction)

[NestJS OpenAPI CLI Plugin](https://docs.nestjs.com/openapi/cli-plugin)

Thank you

Email: MianKhubaib63@gmail.com
