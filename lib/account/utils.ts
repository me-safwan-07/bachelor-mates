// import { TAccountInput, ZAccountInput } from "@/types/account";

// export const filterAccountInputData = (account: Partial<TAccountInput>) => {
//   const supportedProps = Object.keys(ZAccountInput.shape);
//   return supportedProps.reduce<Partial<TAccountInput>>((acc, prop) => {
//     if (account.hasOwnProperty(prop)) {
//       const key = prop as keyof TAccountInput;
//       acc[key] = account[key]!;
//     }
//     return acc;
//   }, {});
// };
