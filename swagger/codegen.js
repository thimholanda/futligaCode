const {codegen} = require('swagger-axios-codegen');

codegen({
  methodNameMode: 'operationId',
  //source: require('../swagger.json'),
  remoteUrl:
    'http://futligaservices-test.sa-east-1.elasticbeanstalk.com/swagger/v1/swagger.json',
  outputDir: './src/services',
  strictNullChecks: false,
  // useCustomerRequestInstance: true,
  modelMode: 'interface',
  extendDefinitionFile: './swagger/customerDefinition.ts',
  extendGenericType: ['JsonResult'],
  sharedServiceOptions: true,
});
