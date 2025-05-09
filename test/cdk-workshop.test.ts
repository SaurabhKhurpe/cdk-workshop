import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkWorkshop from '../lib/cdk-workshop-stack';

test('Lambda Function and DynamoDB Table Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.CdkWorkshopStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  // Check for Lambda function
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs22.x',
    Handler: 'hello.handler',
  });

  // Check for DynamoDB table
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    KeySchema: [
      {
        AttributeName: 'path',
        KeyType: 'HASH',
      },
    ],
  });
});