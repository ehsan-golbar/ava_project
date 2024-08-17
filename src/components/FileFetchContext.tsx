// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// // Define the shape of the data
// export interface Segment {
//     start: string;
//     end: string;
//     text: string;
//   }
  
//  export interface FileData {
//     duration: string;
//     id: number;
//     processed: string;
//     segments: Segment[];
//     length: number;
//     url: string;
//   }
  
// // Define the context type
// export interface FileFetchContextType {
//   fetchFile: FileData[];
//   setFetchFile: React.Dispatch<React.SetStateAction<FileData[]>>;
// }

// // Create the context with a default value
// const FileFetchContext = createContext<FileFetchContextType | undefined>(undefined);

// // Define the provider component's props
// interface FileFetchProviderProps {
//   children: ReactNode;
// }

// // Provider component with data fetching logic
// export const FileFetchProvider: React.FC<FileFetchProviderProps> = ({ children }) => {
//   const [fetchFile, setFetchFile] = useState<FileData[]>([]);


//   return (
//     <FileFetchContext.Provider value={{ fetchFile, setFetchFile }}>
//       {children}
//     </FileFetchContext.Provider>
//   );
// };

// // Custom hook for using the context
// export const useFileFetch = (): FileFetchContextType => {
//   const context = useContext(FileFetchContext);
//   if (!context) {
//     throw new Error('useFileFetch must be used within a FileFetchProvider');
//   }
//   return context;
// };
