const generatePolicy = (principalId, resource, effect = 'Allow') => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});
//

export const basicAuthorizer = async (event, context, callback) => {
  console.log('Event is: ', JSON.stringify(event));

  if (event.type !== 'TOKEN') {
    callback(null, {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify({ message: 'Unauthorized 1111' }),
    });
  } else {
    try {
      const authorizationToken = event.authorizationToken;
  
      const encodedCreds = authorizationToken.split(' ')[1];
      const buff = Buffer.from(encodedCreds, 'base64');
      const plainCreds = buff.toString('utf-8').split(': ');
      const username = plainCreds[0];
      const password = plainCreds[1];
  
      console.log(`username: ${username} and password: ${password}`);

      const storedUserPassword = process.env[username];
      const effect = !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow';
      console.group('EEFECT: ', effect);
  
      const policy = generatePolicy(encodedCreds, event.methodArn, effect);
  
      callback(null, policy);
    } catch(e) {
      callback(null, {
        statusCode: 403,
        headers: {
          "Access-Control-Allow-Headers" : "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify({ message: `Unauthorized: ${e.message}` }),
      });
    }
  }
};
