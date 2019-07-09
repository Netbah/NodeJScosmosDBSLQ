let cosmosDbConfig: any = {};

cosmosDbConfig.host = process.env.HOST || "https://cosmossqlcore1.documents.azure.com:443/";
cosmosDbConfig.authKey = process.env.AUTH_KEY || "DKqPkCGhDbFm4hocGTvN8rJWUZy7XFBQQ0Wu1YDskDG0V3HHwJGDCp1OR2EoHKqRvJtHtvKO3T37WOU28IOnPQ==";

export { cosmosDbConfig };
