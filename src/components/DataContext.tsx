// import React, { createContext, useState, ReactNode, useContext } from 'react';

// interface DataContextType {
//   resultLanguage: string;
//   setResultLanguage: (language: string) => void;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);

// export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [resultLanguage, setResultLanguage] = useState<string>('fa');

//   return (
//     <DataContext.Provider value={{ resultLanguage, setResultLanguage }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (context === undefined) {
//     throw new Error('useData must be used within a DataProvider');
//   }
//   return context;
// };

// // import React, { createContext, useContext, useState, ReactNode } from 'react';

// // // Define the type for the context value
// // interface DataContextType {
// //   resultLanguage: string | null;
// //   setResultLanguage: (data: string) => void;
// // }

// // // Create the context with default values
// // const DataContext = createContext<DataContextType | undefined>(undefined);

// // // Create a provider component
// // export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// //   const [resultLanguage, setResultLanguage] = useState<string | null>(null);

// //   return (
// //     <DataContext.Provider value={{ resultLanguage, setResultLanguage }}>
// //       {children}
// //     </DataContext.Provider>
// //   );
// // };

// // // Custom hook for consuming context
// // export const useData = () => {
// //   const context = useContext(DataContext);
// //   if (!context) {
// //     throw new Error('useData must be used within a DataProvider');
// //   }
// //   return context;
// // };
