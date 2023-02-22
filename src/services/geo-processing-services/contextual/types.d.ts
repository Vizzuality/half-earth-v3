export interface GetCrfDataProps {
  aoiFeatureGeometry: {
    rings: number[][];
  };
  rings: number[][];
  toJSON: () => Record<string, unknown>;
}

export interface JobInfoProps {
  jobId: number;
  fetchResultData: (outputParamKey: string) => function;
  waitForJobCompletion: (jobId: number) => function;
  catch: (error: Error) => unknown;
  then: () => unknown;
}
