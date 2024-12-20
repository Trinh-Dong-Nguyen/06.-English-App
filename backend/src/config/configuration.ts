import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || 'DEVELOPMENT',
  client: process.env.CLIENT_URL,
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  audience: process.env.COGNITO_CLIENT_ID,
  cognitoClientSecret: process.env.COGNITO_CLIENT_SECRET,
  cognitoClient: process.env.COGNITO_CLIENT,
  cognitoDomain: process.env.COGNITO_DOMAIN,
  cognitoRedirectUri: process.env.COGNITO_REDIRECT_URI,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  cloudFrontURL: process.env.CLOUDFRONT_URL,
  vnpayReturnUrl: process.env.VNP_RETURN_URL,
  vnpayUrl: process.env.VNPAY_URL,
  vnpTmnCode: process.env.VNP_TMN_CODE,
  vnpHashSecret: process.env.VNP_HASH_SECRET,
  ipAddress: process.env.IP_ADDRESS_PRODUCTION,
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },

  grpcDiscountUrl: process.env.GRPC_DISCOUNT_URL,
});
