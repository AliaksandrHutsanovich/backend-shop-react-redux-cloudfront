const AWS = jest.requireActual('aws-sdk');

const S3 = () => ({
  getSignedUrlPromise: () => '/some-url',
});

module.exports = {
  ...AWS,
  S3,
};
