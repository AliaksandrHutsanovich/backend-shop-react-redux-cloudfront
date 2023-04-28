import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: 'eu-west-1',
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const BUCKET = 'upload-csvfiles-bucket';

export const importProductsFile = async (event, context, callback) => {
  const { name: fileName } = event.queryStringParameters;

  const params = {
    Bucket: BUCKET,
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: 'text/csv',
  };
  console.log('params are:', params);

  const signedUrl = await s3.getSignedUrlPromise('putObject', params);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: signedUrl,
  };
  callback(null, response);
};
