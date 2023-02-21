export interface GetCrfDataProps {
  aoiFeatureGeometry: {
    rings: number[][];
  };
  toJSON: () => isDefaultToJSON;
}

export interface JobInfoProps {
  jobId: number;
  fetchResultData: (outputParamKey: string) => function;
  waitForJobCompletion: (jobId: number) => function;
  catch: (error: Error) => function;
  then: () => function;
}
