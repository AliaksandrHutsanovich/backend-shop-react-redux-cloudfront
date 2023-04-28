import AWS from 'aws-sdk';
import csvToJson from 'csvtojson';

const s3 = new AWS.S3({
  region: 'eu-west-1',
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const BUCKET = 'upload-csvfiles-bucket';

export const importFileParser = async (event, context, callback) => {
  console.log('RECORDS: ', event.Records);
  for (const record of event.Records) {
    console.log('file: ', record.s3.object.key);
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key,
    };

    const s3Stream = s3.getObject(params).createReadStream();
    const json = await csvToJson().fromStream(s3Stream);
    console.log('ITEMS: ', json);

    await s3.copyObject({
      Bucket: BUCKET,
      CopySource: `${BUCKET}/${record.s3.object.key}`,
      Key: record.s3.object.key.replace('uploaded', 'parsed'),
    }).promise();

    await s3.deleteObject({
      Bucket: BUCKET,
      Key: record.s3.object.key,
    }).promise();
  }
};
