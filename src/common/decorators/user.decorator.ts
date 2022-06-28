import { createParamDecorator } from '@nestjs/common';

export interface IRequestUser extends Request {
  user?: any;
}

export const ReqUser = createParamDecorator(
  (data, req: IRequestUser) => req.user,
);
