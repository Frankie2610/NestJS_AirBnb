// import { Request } from 'express';

// declare global {
//   namespace Express {
//     interface User {
//       role: string;
//     }

//     interface Request {
//       user?: User;
//     }
//   }
// }

// export const isAdmin = (req: Request): any => {
//   const { role } = req.user;
//   console.log(role);

//   if (role !== 'admin' && role !== 'Admin') {
//     return {
//       status: 400,
//       message: 'Unauthorized!',
//     };
//   }
// };
