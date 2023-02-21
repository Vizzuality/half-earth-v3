export interface GetCrfDataProps {
  aoiFeatureGeometry: {
    rings: number[][];
    toJSON: () => isDefaultToJSON;
  };
  dataset: string;
}

export interface JobInfoProps {
  jobId: number;
  fetchResultData: (outputParamKey: string) => function;
  waitForJobCompletion: (jobId: number) => function;
  catch: (error: Error) => function;
  then: () => function;
}

export interface JSONGeometryProps {
  rings: number[][];
  spatialReference: {
    latestWkid: number;
    wkid: number;
  };
}
