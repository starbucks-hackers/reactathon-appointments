'use strict'

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  var appointmentId = event.pathParameters.appointmentId;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: appointmentId,
    },
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      consolse.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });

};

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the Providers.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

module.exports.getProviderAppointments = (event, context, callback) => {
  var providerId = event.pathParameters.providerId;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    ExpressionAttributeValues:{":providerId": providerId},
    FilterExpression: "providerId = :providerId",
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      consolse.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
module.exports.getUserAppointments = (event, context, callback) => {
  var userId = event.pathParameters.userId;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    ExpressionAttributeValues:{":userId": userId},
    FilterExpression: "userId = :userId",
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      consolse.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};

