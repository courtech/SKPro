// Member interface based on the KK Youth Profile fields
export interface Member {
  id: string;
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  name: string;
  age: number;
  birthday: {
    month: number;
    day: number;
    year: number;
  };
  sex: string;
  civilStatus: string;
  youthClassification: string;
  youthAgeGroup: string;
  email: string;
  contactNumber: string;
  homeAddress: string;
  educationalAttainment: string;
  workStatus: string;
  isRegisteredVoter: boolean;
  votedLastElection: boolean;
  attendedKKAssembly: boolean;
  assemblyFrequency?: number;
} 