import { Request } from 'express';

interface RequestContract extends Request {
  auth: {
    userId: String
  };
}

export default RequestContract;