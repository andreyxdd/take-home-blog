import React from 'react';
import { UserContext, IUserContext } from '../context';

export default () => React.useContext(UserContext) as IUserContext;
