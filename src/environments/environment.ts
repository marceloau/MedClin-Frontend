// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //enderecoBase: 'http://ec2-18-228-124-46.sa-east-1.compute.amazonaws.com:9091',
  enderecoBase: 'http://medclin-env.styrvqd2yt.sa-east-1.elasticbeanstalk.com',
  //enderecoBase: 'http://localhost:9091',
  enderecoS3Impressao: 'https://s3-sa-east-1.amazonaws.com/medclinimpressoes/'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
