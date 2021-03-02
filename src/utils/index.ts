import Papa, { ParseResult } from "papaparse";

export const parseCSV = async (file: File): Promise<ParseResult<any>> => {
  const parsedData: ParseResult<any> = await new Promise((resolve, reject) => {
    Papa.parse<any>(file, {
      complete: (parseResult: any) => {
        return resolve(parseResult);
      },
      error: (error) => {
        return reject(error);
      },
    });
  });

  return parsedData;
};

export const fetchRawCSV = async (file: any): Promise<string> => {
  const response: any = await fetch(file ? file : "./data/titanic.csv");
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = await decoder.decode(result.value);

  return csv;
};
